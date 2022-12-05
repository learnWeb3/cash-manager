import { Schema, model, Model, HydratedDocument } from 'mongoose';
import { ProductDocument } from './product.model';

const { Types: { String, ObjectId, Number, Boolean } } = Schema

interface IProductCategory {
  label: string
}

export interface ProductCategoryVirtuals {
  products: ProductDocument[]
}

export interface ProductCategoryMethods {

}

export interface ProductCategoryModel extends Model<IProductCategory, {}, ProductCategoryMethods, ProductCategoryVirtuals> {
  register(data: {
    label: string
  }): Promise<ProductCategoryDocument>
}


export type ProductCategoryDocument = HydratedDocument<IProductCategory, ProductCategoryMethods, ProductCategoryVirtuals>


const ProductCategorySchema = new Schema<IProductCategory, ProductCategoryModel, ProductCategoryMethods, {}, ProductCategoryVirtuals>({
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

ProductCategorySchema.static('register', async function (data: { label: string }) {
  const newProductCategory = new this({
    label: data.label
  })
  return await newProductCategory.save()
})

ProductCategorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category'
})

export const ProductCategory = model<IProductCategory, ProductCategoryModel>('ProductCategory', ProductCategorySchema);
