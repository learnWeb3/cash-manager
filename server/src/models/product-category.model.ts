import { Schema, model, HydratedDocument } from 'mongoose';
import { Model } from 'mongoose';

const { Types: { String, ObjectId, Number, Boolean } } = Schema

interface IProductCategory {
  label: string
}

export interface ProductCategoryMethods {

}

export interface ProductCategoryModel extends Model<IProductCategory, {}, ProductCategoryMethods> {

}

export type ProductCategoryDocument = HydratedDocument<IProductCategory, {}, ProductCategoryMethods>

const ProductCategorySchema = new Schema<IProductCategory, ProductCategoryModel, ProductCategoryMethods>({
  label: {
    type: String,
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

export const ProductCategory = model<IProductCategory, ProductCategoryModel>('ProductCategory', ProductCategorySchema);