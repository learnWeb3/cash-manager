import { createReducer } from "@reduxjs/toolkit";
import { fetchProductCategories } from "../actions/AdminAction";
import { Product } from "./products.reducer";

export interface ProductCategory {
  _id: string;
  label: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  products: Product[];
  id: string;
}

export interface TProductCategoryState {
  productCategories: ProductCategory[];
}

const initialState: TProductCategoryState = {
  productCategories: [],
};

const ProductCategoriesReducer = createReducer(initialState, (builder) =>
  builder.addCase(fetchProductCategories, (state, action) => {
    state.productCategories = action.payload;
  })
);

export default ProductCategoriesReducer;
