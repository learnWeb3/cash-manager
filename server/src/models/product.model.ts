import { Schema, model } from "mongoose";
import { APIErrorType } from "../services/errors.service";
import idValidator from "mongoose-id-validator";
import bcrypt from "bcrypt";
import { Int32 } from "mongodb";
import { IProductDocument, IProductModel } from "../types/IProduct";
import { ProductUnit } from "../types/ProductUnit";
const { String } = Schema.Types;

const ProductSchema = new Schema({
  category: {
    type: String,
    required: true,
    ref: "ProductCategory",
  },
  unit: {
    type: String,
    default: ProductUnit.U,
    required: true,
  },
  label: {
    type: String,
    lowercase: true,
  },
  product_unit: {
    type: String,
  },

  description: {
    type: String,
  },
});

ProductSchema.statics.createProduct = async function (
  label: String,
  category: String,
  product_unit: String,
  description: String
) {
  const ProductModel = new Product({});
};
const Product = model<IProductDocument, IProductModel>(
  "Product",
  ProductSchema
);

export default ProductSchema;
