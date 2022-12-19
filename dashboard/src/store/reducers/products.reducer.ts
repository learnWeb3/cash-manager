import { createReducer } from "@reduxjs/toolkit";
import { fetchProducts } from "../actions/AdminAction";

export interface Product {
  unit: string;
  category: string;
  label: string;
  deleted: boolean;
  _id: string;
  createdAt: string;
  currentPrice: {
    _id: string;
    product: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  currentStock: number;
  id: string;
}

export interface TProductState {
    products: Product[]
}

const initialState: TProductState = {
  products: [],
};

const ProductsReducer = createReducer(initialState, (builder) =>
    builder.addCase(fetchProducts, (state, action) => {
        state.products = action.payload;
    })
);

export default ProductsReducer;
