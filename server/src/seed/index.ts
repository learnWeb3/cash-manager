import { connectDatabase } from "../services/mongoose/database.service";
import User from "../models/user.model";
import { Product } from "../models/product.model";
import { ProductCategory } from "../models/product-category.model";
import { ProductUnit } from "../models/ProductUnit";
import { Inventory } from "../models/inventory.model";
import { Ticket } from "../models/ticket.model";
import { ClosingInventoryProduct } from "../models/closing-product-inventory";
import { ProductPrice } from "../models/product-price.model";
import { InventoryProduct } from "../models/inventory-product.model";

connectDatabase().then(async (connection) => {
  // create users
  const registeredUser = await User.createUser(
    "John",
    "Doe",
    "john.doe@yopmail.com",
    "foobar"
  );

  // create product categories
  const productCategories = [
    {
      label: "fresh products",
    },
    {
      label: "grocery",
    },
    {
      label: "liquid",
    },
    {
      label: "frozen",
    },
    {
      label: "non-food products",
    },
  ];
  for (const productCategory of productCategories) {
    await ProductCategory.register({
      label: productCategory.label,
    });
  }

  const registeredProductCategories = await ProductCategory.find({});
  // create products
  const products = [
    {
      label: "Tomato",
      category: registeredProductCategories.find(
        (productCategory) => productCategory.label === "fresh products"
      ).id,
      unit: ProductUnit.KG,
      price: 2.5,
      ref: "0242ac120002",
      description:
        "Quis enim eiusmod ut consectetur consectetur. Fugiat qui ipsum minim exercitation est est enim dolore ipsum. Non dolore consequat sint aliquip in quis veniam Lorem aliqua aute velit ad. Ea eu officia dolore do sit id ex eiusmod minim aliquip sint. Veniam deserunt nostrud adipisicing irure incididunt anim laborum magna eu reprehenderit duis fugiat. Officia culpa culpa officia aliqua enim et fugiat sunt aute veniam ipsum ad sunt. Aliquip excepteur minim ullamco sunt nostrud id excepteur sit ex laboris ea ut sint exercitation.",
    },
    {
      label: "Pasta Barilla 1Kg",
      category: registeredProductCategories.find(
        (productCategory) => productCategory.label === "grocery"
      ).id,
      unit: ProductUnit.U,
      price: 1.38,
      ref: "0242ac120003",
      description:
        "Officia deserunt esse non non magna sunt deserunt. Deserunt culpa reprehenderit quis aute commodo ut labore quis sunt elit ipsum ipsum. Sit pariatur elit sint tempor officia labore et fugiat Lorem.",
    },
    {
      label: "Heineken Beer x6 pack",
      category: registeredProductCategories.find(
        (productCategory) => productCategory.label === "liquid"
      ).id,
      unit: ProductUnit.U,
      price: 6.7,
      ref: "0242ac120004",
      description:
        "Exercitation laborum deserunt ullamco do aliquip. Nulla officia excepteur non sint anim dolore Lorem anim fugiat in nisi. Consectetur fugiat mollit labore cupidatat dolore velit officia consequat deserunt fugiat nisi incididunt ullamco.",
    },
    {
      label: "French fries 750g",
      category: registeredProductCategories.find(
        (productCategory) => productCategory.label === "frozen"
      ).id,
      unit: ProductUnit.U,
      price: 7.25,
      ref: "0242ac120005",
      description:
        "In non est duis pariatur occaecat elit ut quis laborum amet et eu cillum. Dolore occaecat velit ea officia quis minim deserunt non dolor magna eu non quis anim. Cupidatat ut excepteur esse tempor do voluptate aute do reprehenderit culpa.",
    },
    {
      label: "Shampoo Le Petit Marseillais 350 mL",
      category: registeredProductCategories.find(
        (productCategory) => productCategory.label === "non-food products"
      ).id,
      unit: ProductUnit.U,
      price: 4.23,
      ref: "0242ac120006",
      description:
        "Et ullamco amet in ut sunt Lorem. Adipisicing commodo cupidatat Lorem culpa. Qui nisi veniam consectetur consequat magna id. Enim sint ipsum id nulla cupidatat enim laboris aliqua. In enim deserunt Lorem occaecat sunt cillum magna incididunt sunt ipsum tempor labore.",
    },
  ];

  for (const product of products) {
    const newProduct = await Product.register({
      unit: product.unit,
      label: product.label,
      category: product.category,
      ref: product.ref,
      description: product.description,
    });
    // create product price
    await Product.ammendOnePrice(newProduct.id, product.price);

    // making price creation date before any sales
    const updatedProduct = await Product.findOneWithCurrentPrice({
      _id: newProduct.id,
    });

    const productPrice = await ProductPrice.findById(
      updatedProduct.currentPrice._id
    );
    productPrice.createdAt = new Date(
      new Date().getTime() - 366 * 24 * 60 * 60 * 1000
    );
    await productPrice.save();
  }

  // create inventories ==> stock IN
  const registedProducts = await Product.find({});
  await Inventory.register({
    user: registeredUser.id,
    products: registedProducts.map((product) => ({
      id: product.id,
      quantity: 100000,
      // quantity: 5,
      price: Math.ceil(Math.random() * 10) * 100000,
    })),
  });

  // NEED TO ANTIDATE INVENTORY CREATION DATE
  const inventories = await Inventory.find({});
  for (const inventory of inventories) {
    inventory.createdAt = new Date(
      new Date().getTime() - 366 * 24 * 60 * 60 * 1000
    );
    await inventory.save();
  }
  // NEED TO ANTIDATE THE INVENTORY PRODUCT CREATION DATE
  const inventoryProducts = await InventoryProduct.find({});

  for (const inventoryProduct of inventoryProducts) {
    inventoryProduct.createdAt = new Date(
      new Date().getTime() - 366 * 24 * 60 * 60 * 1000
    );
    await inventoryProduct.save();
  }

  // create tickets ==> stock OUT
  for (let day = 365; day > 0; day--) {
    const createdAt = new Date(
      new Date().getTime() - day * 24 * 60 * 60 * 1000
    );
    const ticket = {
      user: registeredUser.id,
      products: registedProducts.map((product) => ({
        id: product.id,
        quantity: Math.ceil(Math.random() * 100),
      })),
    };
    const newTicket = await Ticket.register(ticket);
    newTicket.createdAt = createdAt;
    newTicket.updatedAt = createdAt;
    for (const ticketProduct of newTicket.products) {
      ticketProduct.createdAt = createdAt;
      ticketProduct.updatedAt = createdAt;
      await ticketProduct.save();
    }
    await newTicket.save();
  }

  // register closing inventory product
  const allProductsWithStocks = await Product.find({}).then(
    async (data) =>
      await Promise.all(data.map((product) => product.getCurrentStock()))
  );

  await ClosingInventoryProduct.register({
    user: registeredUser.id,
    products: allProductsWithStocks.map((product) => ({
      id: product.id,
      quantity: product.currentStock,
    })),
  });

  // create inventories ==> stock IN
  await Inventory.register({
    user: registeredUser.id,
    products: registedProducts.map((product) => ({
      id: product.id,
      quantity: 5,
      price: Math.ceil(Math.random() * 100),
    })),
  });

  // get all products with stock (querying efficiently the stock in an intermediary collection THIS WILL BE DONE USING A CRON JOB)
  const registeredProductsWithStocks =
    await Product.findAllWithCurrentPriceAndStockAndMedias({}).then(
      async (data) =>
        await Promise.all(data.map((product) => product.getCurrentStock()))
    );

  await Ticket.getAnalytics({
    start: Date.now() - 24 * 600 * 60 * 60 * 1000,
    end: Date.now() + 24 * 60 * 60 * 1000,
  }).then((data) => console.log(data));

  process.exit(0);
});
