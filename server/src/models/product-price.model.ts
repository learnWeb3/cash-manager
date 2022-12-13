import { Schema, model, HydratedDocument } from 'mongoose';
import { Model } from 'mongoose';

const { Types: { String, ObjectId, Number, Boolean } } = Schema

interface IProductPrice {
  product: typeof ObjectId;
  price: Number
  createdAt: Date
  updatedAt: Date
}

export interface ProductPriceMethods {

}

export interface ProductPriceModel extends Model<IProductPrice, {}, ProductPriceMethods> {

}

export type ProductPriceDocument = HydratedDocument<IProductPrice, {}, ProductPriceMethods>

const ProductPriceSchema = new Schema<IProductPrice, ProductPriceModel, ProductPriceMethods>({
  product: {
    type: ObjectId,
    required: true,
    ref: 'Product'
  },
  price: {
    type: Number,
    required: true
  },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});

export const ProductPrice = model<IProductPrice, ProductPriceModel>('ProductPrice', ProductPriceSchema);