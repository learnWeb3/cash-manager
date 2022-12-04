import { Document } from "mongodb";
import { Model } from "mongoose";

export interface IProductCategory extends Document {
  label: string;
}

export interface IProductCategoryDocument extends IProductCategory, Document {}

export interface IProductCategoryModel
  extends Model<IProductCategoryDocument> {}
