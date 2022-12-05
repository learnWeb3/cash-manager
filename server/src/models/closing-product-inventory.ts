import { Schema, model, HydratedDocument } from 'mongoose';
import { Model } from 'mongoose';
import User from './user.model';
import { Product } from './product.model';

const { Types: { ObjectId, Number } } = Schema

interface IClosingInventoryProduct {
    product: typeof ObjectId,
    user: typeof ObjectId,
    quantity: number,
    createdAt: Date,
    updatedAt: Date
}

export interface ClosingInventoryProductMethods {

}

export interface ClosingInventoryProductModel extends Model<IClosingInventoryProduct, {}, ClosingInventoryProductMethods> {
    register(data: {
        user: string,
        products: { id: string, quantity: number }[]
    }): Promise<ClosingInventoryProductDocument[]>
}

export type ClosingInventoryProductDocument = HydratedDocument<IClosingInventoryProduct, {}, ClosingInventoryProductMethods>

const ClosingInventoryProductSchema = new Schema<IClosingInventoryProduct, ClosingInventoryProductModel, ClosingInventoryProductMethods>({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    product: {
        type: ObjectId,
        required: true,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

ClosingInventoryProductSchema.static('register', async function (data: { user: string, products: { id: string, quantity: number }[] }) {
    const errors = [];
    const userExists = await User.exists({
        _id: data.user
    })
    if (!userExists) {
        errors.push(`User does not exists with id ${data.user}`)
    }
    for (const product of data.products) {
        const productExists = await Product.exists({
            _id: product.id,
            deleted: false
        })
        if (!productExists) {
            errors.push(`Product does not exists with id ${product.id}`)
        }
    }
    if (errors.length) {
        throw new Error(errors.join(', '))
    }

    const newInventoriesProducts = []

    for (const product of data.products) {
        const newClosingInventoryProduct = new this({
            user: data.user,
            product: product.id,
            quantity: product.quantity
        })
        newInventoriesProducts.push(await newClosingInventoryProduct.save());
    }

    return newInventoriesProducts

})

export const ClosingInventoryProduct = model<IClosingInventoryProduct, ClosingInventoryProductModel>('ClosingInventoryProduct', ClosingInventoryProductSchema);