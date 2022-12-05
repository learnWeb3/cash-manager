import { Document } from "mongodb";
import { Model } from "mongoose";

export interface IProduct extends Document {
  category: {
    first: String;
    last: String;
  };
  role: string;
  email: {
    address: String;
    activate: Boolean;
  };
  password: String;
  adress: String;
  phone: String;
}

export interface IProductDocument extends IProduct, Document {}

export interface IProductModel extends Model<IProductDocument> {
  createProduct(): Promise<any>;
}
