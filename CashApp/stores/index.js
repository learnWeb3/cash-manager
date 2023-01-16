import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./reducers/currentUserReducer";
import isNetworkAvailableReducer from "./reducers/isNetworkAvailableReducer";
import productCategoriesReducer from "./reducers/productCategoriesReducer";
import productsReducer from "./reducers/productsReducer";
import productsUnitsReducer from "./reducers/productsUnitsReducer";
import ticketsReducer from "./reducers/ticketsReducer";

export default configureStore({
  reducer: {
    currentUser: currentUserReducer,
    isNetworkAvailable: isNetworkAvailableReducer,
    productCategories: productCategoriesReducer,
    products: productsReducer,
    productsUnits: productsUnitsReducer,
    tickets: ticketsReducer,
  },
});
