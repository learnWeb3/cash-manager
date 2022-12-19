import { createAction } from "@reduxjs/toolkit";
import { AdminActionTypes, TFetchErrorPayload } from "./ActionTypes";
import withoutPayloadType from "../../utils/PayloadType";
import IUser from "../../types/IUser";
import withPayloadType from "../../utils/PayloadType";
import { Product } from "../reducers/products.reducer";
import { ProductCategory } from "../reducers/productCategories.reducer";

export interface TFetchUserListSuccessPayload {
  success: boolean;
  status: number;
  users: IUser[];
}

export const fetchUserList = createAction(
  AdminActionTypes.FETCH_USER_LIST,
  withoutPayloadType()
);
export const fetchUserListSuccess = createAction(
  AdminActionTypes.FETCH_USER_LIST_SUCCESS,
  withPayloadType<TFetchUserListSuccessPayload>()
);
export const fetchUserListError = createAction(
  AdminActionTypes.FETCH_USER_LIST_ERROR,
  withPayloadType<TFetchErrorPayload>()
);

export interface TFetchOneUserPayload {
  _id: string;
}

export interface TFetchOneUserSuccessPayload {
  success: boolean;
  status: number;
  user: IUser;
}

export const fetchOneUser = createAction(
  AdminActionTypes.FETCH_ONE_USER,
  withPayloadType<TFetchOneUserPayload>()
);
export const fetchOneUserSuccess = createAction(
  AdminActionTypes.FETCH_ONE_USER_SUCCESS,
  withPayloadType<TFetchOneUserSuccessPayload>()
);
export const fetchOneUserError = createAction(
  AdminActionTypes.FETCH_ONE_USER_ERROR,
  withPayloadType<TFetchErrorPayload>()
);
export const fetchAnalytics = createAction(
  AdminActionTypes.FETCH_ANALYTICS,
  withPayloadType<any>()
);
export const fetchProducts = createAction(
  AdminActionTypes.FETCH_PRODUCTS,
  withPayloadType<Product[]>()
);

export const fetchProductCategories = createAction(
  AdminActionTypes.FETCH_PRODUCTS_CATEGORIES,
  withPayloadType<ProductCategory[]>()
);

export const clearAdminError = createAction(
  AdminActionTypes.CLEAR_ADMIN_ERROR,
  withoutPayloadType()
);
