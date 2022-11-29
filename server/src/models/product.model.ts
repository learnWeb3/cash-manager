import { Schema, model, HydratedDocument } from 'mongoose';
import { ProductUnit } from './ProductUnit';
import { Model } from 'mongoose';

const { Types: { String, ObjectId, Number, Boolean } } = Schema

interface IProduct {
  unit: ProductUnit,
  category: typeof ObjectId,
  label: string
}

export interface ProductMethods {

}

export interface ProductModel extends Model<IProduct, {}, ProductMethods> {

}

export type ProductDocument = HydratedDocument<IProduct, {}, ProductMethods>

const ProductSchema = new Schema<IProduct, ProductModel, ProductMethods>({
  unit: {
    type: String,
    required: true,
    default: ProductUnit.U
  },
  category: {
    required: true,
    type: ObjectId,
    ref: 'ProductCategory'
  },
  label: {
    type: String,
    required: true,
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

export const Product = model<IProduct, ProductModel>('Product', ProductSchema);