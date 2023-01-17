import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    value: [
      // {
      //   _id: "638cac6e0793c7144096b63e",
      //   unit: "Kg",
      //   category: "638cac6e0793c7144096b632",
      //   label: "Tomato",
      //   deleted: false,
      //   createdAt: "2022-12-04T14:19:26.109Z",
      //   updatedAt: "2022-12-04T14:19:26.109Z",
      //   __v: 0,
      //   currentPrice: {
      //     _id: "638cac6e0793c7144096b643",
      //     product: "638cac6e0793c7144096b63e",
      //     price: 2.5,
      //     createdAt: "2022-12-04T14:19:26.113Z",
      //     updatedAt: "2022-12-04T14:19:26.113Z",
      //     __v: 0,
      //     id: "638cac6e0793c7144096b643",
      //   },
      //   currentStock: 5,
      //   id: "638cac6e0793c7144096b63e",
      // },
      // {
      //   _id: "638cac6e0793c7144096b648",
      //   unit: "u",
      //   category: "638cac6e0793c7144096b634",
      //   label: "Pasta Barilla 1Kg",
      //   deleted: false,
      //   createdAt: "2022-12-04T14:19:26.116Z",
      //   updatedAt: "2022-12-04T14:19:26.116Z",
      //   __v: 0,
      //   currentPrice: {
      //     _id: "638cac6e0793c7144096b64d",
      //     product: "638cac6e0793c7144096b648",
      //     price: 1.38,
      //     createdAt: "2022-12-04T14:19:26.120Z",
      //     updatedAt: "2022-12-04T14:19:26.120Z",
      //     __v: 0,
      //     id: "638cac6e0793c7144096b64d",
      //   },
      //   currentStock: 5,
      //   id: "638cac6e0793c7144096b648",
      // },
      // {
      //   _id: "638cac6e0793c7144096b652",
      //   unit: "u",
      //   category: "638cac6e0793c7144096b636",
      //   label: "Heineken Beer x6 pack",
      //   deleted: false,
      //   createdAt: "2022-12-04T14:19:26.124Z",
      //   updatedAt: "2022-12-04T14:19:26.124Z",
      //   __v: 0,
      //   currentPrice: {
      //     _id: "638cac6e0793c7144096b657",
      //     product: "638cac6e0793c7144096b652",
      //     price: 6.7,
      //     createdAt: "2022-12-04T14:19:26.127Z",
      //     updatedAt: "2022-12-04T14:19:26.127Z",
      //     __v: 0,
      //     id: "638cac6e0793c7144096b657",
      //   },
      //   currentStock: 5,
      //   id: "638cac6e0793c7144096b652",
      // },
      // {
      //   _id: "638cac6e0793c7144096b65c",
      //   unit: "u",
      //   category: "638cac6e0793c7144096b638",
      //   label: "French fries 750g",
      //   deleted: false,
      //   createdAt: "2022-12-04T14:19:26.129Z",
      //   updatedAt: "2022-12-04T14:19:26.129Z",
      //   __v: 0,
      //   currentPrice: {
      //     _id: "638cac6e0793c7144096b661",
      //     product: "638cac6e0793c7144096b65c",
      //     price: 7.25,
      //     createdAt: "2022-12-04T14:19:26.131Z",
      //     updatedAt: "2022-12-04T14:19:26.131Z",
      //     __v: 0,
      //     id: "638cac6e0793c7144096b661",
      //   },
      //   currentStock: 5,
      //   id: "638cac6e0793c7144096b65c",
      // },
      // {
      //   _id: "638cac6e0793c7144096b666",
      //   unit: "u",
      //   category: "638cac6e0793c7144096b63a",
      //   label: "Shampoo Le Petit Marseillais 350 mL",
      //   deleted: false,
      //   createdAt: "2022-12-04T14:19:26.134Z",
      //   updatedAt: "2022-12-04T14:19:26.134Z",
      //   __v: 0,
      //   currentPrice: {
      //     _id: "638cac6e0793c7144096b66b",
      //     product: "638cac6e0793c7144096b666",
      //     price: 4.23,
      //     createdAt: "2022-12-04T14:19:26.137Z",
      //     updatedAt: "2022-12-04T14:19:26.137Z",
      //     __v: 0,
      //     id: "638cac6e0793c7144096b66b",
      //   },
      //   currentStock: 5,
      //   id: "638cac6e0793c7144096b666",
      // },
      // {
      //   _id: "638dd540e520660d2009401d",
      //   unit: "L",
      //   category: "638cac6e0793c7144096b632",
      //   label: "test product",
      //   deleted: false,
      //   createdAt: "2022-12-05T11:25:52.194Z",
      //   updatedAt: "2022-12-05T11:25:52.194Z",
      //   __v: 0,
      //   currentPrice: null,
      //   currentStock: 0,
      //   id: "638dd540e520660d2009401d",
      // },
    ],
  },
  reducers: {
    setProducts: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;