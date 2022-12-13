import { connectDatabase } from "../services/mongoose/database.service";
import User from '../models/user.model';
import { Product } from '../models/product.model';
import { ProductCategory } from '../models/product-category.model';
import { ProductUnit } from "../models/ProductUnit";
import { Inventory } from '../models/inventory.model';
import { Ticket } from '../models/ticket.model';
import { ClosingInventoryProduct } from "../models/closing-product-inventory";
import { ProductPrice } from "../models/product-price.model";

connectDatabase().then(async (connection) => {

    // create users
    const registeredUser = await User.createUser("John", "Doe", "john.doe@yopmail.com", "foobar")

    // create product categories
    const productCategories = [
        {
            label: 'fresh products'
        },
        {
            label: 'grocery'
        },
        {
            label: 'liquid'
        },
        {
            label: 'frozen'
        },
        {
            label: 'non-food products'
        }
    ]
    for (const productCategory of productCategories) {
        await ProductCategory.register({
            label: productCategory.label
        })
    }

    const registeredProductCategories = await ProductCategory.find({})
    // create products
    const products = [
        {
            label: 'Tomato',
            category: registeredProductCategories.find((productCategory) => productCategory.label === 'fresh products').id,
            unit: ProductUnit.KG,
            price: 2.50,
            ref: "0242ac120002"
        },
        {
            label: 'Pasta Barilla 1Kg',
            category: registeredProductCategories.find((productCategory) => productCategory.label === 'grocery').id,
            unit: ProductUnit.U,
            price: 1.38,
            ref: "0242ac120003"
        },
        {
            label: 'Heineken Beer x6 pack',
            category: registeredProductCategories.find((productCategory) => productCategory.label === 'liquid').id,
            unit: ProductUnit.U,
            price: 6.70,
            ref: "0242ac120004"
        },
        {
            label: 'French fries 750g',
            category: registeredProductCategories.find((productCategory) => productCategory.label === 'frozen').id,
            unit: ProductUnit.U,
            price: 7.25,
            ref: "0242ac120005"
        },
        {
            label: 'Shampoo Le Petit Marseillais 350 mL',
            category: registeredProductCategories.find((productCategory) => productCategory.label === 'non-food products').id,
            unit: ProductUnit.U,
            price: 4.23,
            ref: "0242ac120006"
        }
    ]

    for (const product of products) {
        const newProduct = await Product.register({
            unit: product.unit,
            label: product.label,
            category: product.category,
            ref: product.ref,
        })
        await Product.ammendOnePrice(newProduct.id, product.price)

        // making price creation date before any sales
        const updatedProduct = await Product.findOneWithCurrentPrice({
            _id: newProduct.id
        });

        const productPrice = await ProductPrice.findById(updatedProduct.currentPrice._id)
        productPrice.createdAt = new Date(new Date().getTime() - 366 * 24 * 60 * 60 * 1000)
        await productPrice.save()
    }

    // create inventories ==> stock IN
    const registedProducts = await Product.find({})
    await Inventory.register({
        user: registeredUser.id,
        products: registedProducts.map((product) => ({
            id: product.id,
            quantity: 100000,
            // quantity: 5,
            price: Math.ceil(Math.random() * 100)
        }))
    })

    // create tickets ==> stock OUT
    for (let day = 365; day > 0; day--) {
        const createdAt = new Date(new Date().getTime() - day * 24 * 60 * 60 * 1000)
        const ticket = {
            user: registeredUser.id,
            products: registedProducts.map((product) => ({
                id: product.id,
                quantity: Math.ceil(Math.random() * 100)
            }))
        }
        const newTicket = await Ticket.register(ticket)
        newTicket.createdAt = createdAt;
        newTicket.updatedAt = createdAt;
        for (const ticketProduct of newTicket.products) {
            ticketProduct.createdAt = createdAt;
            ticketProduct.updatedAt = createdAt
            await ticketProduct.save()
        }
        await newTicket.save()
    }

    // register closing invebntory product

    const allProductsWithStocks = await Product.find({}).then(async (data) => await Promise.all(data.map((product) => product.getCurrentStock())))

    await ClosingInventoryProduct.register({
        user: registeredUser.id,
        products: allProductsWithStocks.map((product) => ({
            id: product.id,
            quantity: product.currentStock
        }))
    })

    // create inventories ==> stock IN
    await Inventory.register({
        user: registeredUser.id,
        products: registedProducts.map((product) => ({
            id: product.id,
            quantity: 5,
            price: Math.ceil(Math.random() * 100)
        }))
    })


    // get all products with stock (querying efficiently the stock in an intermediary collection THIS WILL BE DONE USING A CRON JOB)
    const registeredProductsWithStocks = await Product.findAllWithCurrentStockAndPrice({}).then(async (data) => await Promise.all(data.map((product) => product.getCurrentStock())))

    Ticket.getAnalytics({
        start: 1000,
        end: 1000
    })
})