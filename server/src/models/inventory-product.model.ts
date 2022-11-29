import { Schema, model, HydratedDocument } from 'mongoose';
import { Model } from 'mongoose';

const { Types: { ObjectId, Number } } = Schema

interface IInventoryProduct {
  product: typeof ObjectId,
  inventory: typeof ObjectId,
  quantity: number
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
  },
  inventory: {
    type: ObjectId,
    required: true,
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

export const InventoryProduct = model<IInventoryProduct, InventoryProductModel>('InventoryProduct', InventoryProductSchema);