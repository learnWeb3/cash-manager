import { Schema, model } from "mongoose";
import {
  IProductCategory,
  IProductCategoryModel,
} from "../types/IProductCategory";
const { String } = Schema.Types;

const ProductCategorySchema = new Schema(
  {
    label: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const ProudctCategory = model<IProductCategory, IProductCategoryModel>(
  "ProductCategory",
  ProductCategorySchema
);

export default ProductCategorySchema;
