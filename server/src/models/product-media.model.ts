import { Schema, model, HydratedDocument } from 'mongoose';
import { Model } from 'mongoose';

const { Types: { String, ObjectId, Number, Boolean } } = Schema

interface IProductMedia {
  product: typeof ObjectId;
  media: typeof ObjectId
}

export interface ProductMediaMethods {

}

export interface ProductMediaModel extends Model<IProductMedia, {}, ProductMediaMethods> {

}

export type ProductMediaDocument = HydratedDocument<IProductMedia, {}, ProductMediaMethods>

const ProductMediaSchema = new Schema<IProductMedia, ProductMediaModel, ProductMediaMethods>({
  product: {
    type: ObjectId,
    required: true,
    ref: 'Product'
  },
  media: {
    type: ObjectId,
    required: true,
    ref: 'Media'
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

export const ProductMedia = model<IProductMedia, ProductMediaModel>('ProductMedia', ProductMediaSchema);