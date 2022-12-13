import { connectDatabase } from "../services/mongoose/database.service";
import User from '../models/user.model';
import { Product } from '../models/product.model';
import { ProductCategory } from '../models/product-category.model';
import { ProductUnit } from "../models/ProductUnit";
import { Inventory } from '../models/inventory.model';
import { Ticket } from '../models/ticket.model';
import { ClosingInventoryProduct } from "../models/closing-product-inventory";

connectDatabase().then(async (connection) => {

    // // create users
    // const registeredUser = await User.createUser("John", "Doe", "john.doe@yopmail.com", "foobar")

    // // create product categories
    // const productCategories = [
    //     {
    //         label: 'fresh products'
    //     },
    //     {
    //         label: 'grocery'
    //     },
    //     {
    //         label: 'liquid'
    //     },
    //     {
    //         label: 'frozen'
    //     },
    //     {
    //         label: 'non-food products'
    //     }
    // ]
    // for (const productCategory of productCategories) {
    //     await ProductCategory.register({
    //         label: productCategory.label
    //     })
    // }

    // const registeredProductCategories = await ProductCategory.find({})
    // // create products
    // const products = [
    //     {
    //         label: 'Tomato',
    //         category: registeredProductCategories.find((productCategory) => productCategory.label === 'fresh products').id,
    //         unit: ProductUnit.KG,
    //         price: 2.50,
    //         ref: "0242ac120002"
    //     },
    //     {
    //         label: 'Pasta Barilla 1Kg',
    //         category: registeredProductCategories.find((productCategory) => productCategory.label === 'grocery').id,
    //         unit: ProductUnit.U,
    //         price: 1.38,
    //         ref: "0242ac120003"
    //     },
    //     {
    //         label: 'Heineken Beer x6 pack',
    //         category: registeredProductCategories.find((productCategory) => productCategory.label === 'liquid').id,
    //         unit: ProductUnit.U,
    //         price: 6.70,
    //         ref: "0242ac120004"
    //     },
    //     {
    //         label: 'French fries 750g',
    //         category: registeredProductCategories.find((productCategory) => productCategory.label === 'frozen').id,
    //         unit: ProductUnit.U,
    //         price: 7.25,
    //         ref: "0242ac120005"
    //     },
    //     {
    //         label: 'Shampoo Le Petit Marseillais 350 mL',
    //         category: registeredProductCategories.find((productCategory) => productCategory.label === 'non-food products').id,
    //         unit: ProductUnit.U,
    //         price: 4.23,
    //         ref: "0242ac120006"
    //     }
    // ]

    // for (const product of products) {
    //     const newProduct = await Product.register({
    //         unit: product.unit,
    //         label: product.label,
    //         category: product.category,
    //         ref: product.ref,
    //     })
    //     await Product.ammendOnePrice(newProduct.id, product.price)
    // }

    // // create inventories ==> stock IN
    // const registedProducts = await Product.find({})
    // await Inventory.register({
    //     user: registeredUser.id,
    //     products: registedProducts.map((product) => ({
    //         id: product.id,
    //         quantity: 5,
    //         price: Math.ceil(Math.random() * 100)
    //     }))
    // })

    // // create tickets ==> stock OUT

    // const tickets = [
    //     {
    //         user: registeredUser.id,
    //         products: registedProducts.map((product) => ({
    //             id: product.id,
    //             quantity: 5
    //         }))
    //     }
    // ]

    // for (const ticket of tickets) {
    //     await Ticket.register(ticket)
    // }

    // // register closing invebntory product

    // const allProductsWithStocks = await Product.find({}).then(async (data) => await Promise.all(data.map((product) => product.getCurrentStock())))

    // await ClosingInventoryProduct.register({
    //     user: registeredUser.id,
    //     products: allProductsWithStocks.map((product) => ({
    //         id: product.id,
    //         quantity: product.currentStock
    //     }))
    // })

    // // create inventories ==> stock IN
    // await Inventory.register({
    //     user: registeredUser.id,
    //     products: registedProducts.map((product) => ({
    //         id: product.id,
    //         quantity: 5,
    //         price: Math.ceil(Math.random() * 100)
    //     }))
    // })


    // // get all products with stock (querying efficiently the stock in an intermediary collection THIS WILL BE DONE USING A CRON JOB)
    // const registeredProductsWithStocks = await Product.findAllWithCurrentStockAndPrice({}).then(async (data) => await Promise.all(data.map((product) => product.getCurrentStock())))

    Ticket.getAnalytics({
        start: 1000,
        end: 1000
    })
})