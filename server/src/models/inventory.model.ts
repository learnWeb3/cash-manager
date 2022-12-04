import { Schema, model, HydratedDocument, Model } from 'mongoose';
import { InventoryProduct } from './inventory-product.model';
import { Product, ProductDocument } from './product.model';
import User from './user.model';

const { Types: { String, ObjectId, Number, Boolean } } = Schema

interface IInventory {
    user: typeof ObjectId,
    createdAt: Date
    updatedAt: Date
}

export interface InventoryVirtuals {
    products: ProductDocument[]
}

export interface InventoryMethods {

}

export interface InventoryModel extends Model<IInventory, {}, InventoryMethods, InventoryVirtuals> {
    register(data: {
        user: string,
        products: { id: string, quantity: number }[]
    }): Promise<InventoryDocument>
    findOneWithUser(filters: { [key: string]: any }): Promise<InventoryDocument>,
    findOneWithProducts(filters: { [key: string]: any }): Promise<InventoryDocument>,
    findOneWithUserAndProducts(filters: { [key: string]: any }): Promise<InventoryDocument>,
}

export type InventoryDocument = HydratedDocument<IInventory, InventoryMethods, InventoryVirtuals>

const InventorySchema = new Schema<IInventory, InventoryModel, InventoryMethods, {}, InventoryVirtuals>({
    user: {
        type: ObjectId,
        ref: 'User'
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

InventorySchema.virtual('products', {
    ref: 'InventoryProduct',
    localField: '_id',
    foreignField: 'inventory'
})

InventorySchema.static('register', async function (data: { user: string, products: { id: string, quantity: number }[] }) {
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

    const newInventory = new this({
        user: data.user
    })

    const { id: newInventoryId } = await newInventory.save()

    for (const product of data.products) {
        const newInventoryProduct = new InventoryProduct({
            inventory: newInventory.id,
            product: product.id,
            quantity: product.quantity
        })

        await newInventoryProduct.save()
    }

    return await this.findOneWithUser({
        _id: newInventoryId
    }).then(async (ticketWithUser) => {
        const ticketWithProducts = await this.findOneWithProducts({
            _id: newInventoryId
        })
        ticketWithProducts.user = ticketWithUser.user;
        return ticketWithProducts
    })
})

InventorySchema.static('findOneWithUser', async function (filters) {
    return await this.findOne(filters).populate({
        path: 'user'
    })
})

InventorySchema.static('findOneWithProducts', async function (filters: {
    [key: string]: any
}) {
    return await this.findOne(filters).populate({
        path: 'products',
        populate: 'product'
    })
})

InventorySchema.static('findOneWithUserAndProducts', async function (filters: {
    [key: string]: any
}) {
    return await this.findOne(filters)
        .populate('user')
        .populate({
            path: 'products',
            populate: 'product'
        })
})

export const Inventory = model<IInventory, InventoryModel>('Inventory', InventorySchema);