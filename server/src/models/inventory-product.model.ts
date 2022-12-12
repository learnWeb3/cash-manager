import { Schema, model, HydratedDocument } from 'mongoose';
import { Model } from 'mongoose';

const { Types: { ObjectId, Number } } = Schema

interface IInventoryProduct {
  product: typeof ObjectId
  inventory: typeof ObjectId
  price: number,
  quantity: number
  createdAt: Date
  updatedAt: Date
}

export interface InventoryProductMethods {

}

export interface InventoryProductModel extends Model<IInventoryProduct, {}, InventoryProductMethods> {

}

export type InventoryProductDocument = HydratedDocument<IInventoryProduct, {}, InventoryProductMethods>

const InventoryProductSchema = new Schema<IInventoryProduct, InventoryProductModel, InventoryProductMethods>({
  product: {
    type: ObjectId,
    required: true,
    ref: 'Product'
  },
  inventory: {
    type: ObjectId,
    required: true,
    ref: 'Inventory'
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
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

export const InventoryProduct = model<IInventoryProduct, InventoryProductModel>('InventoryProduct', InventoryProductSchema);