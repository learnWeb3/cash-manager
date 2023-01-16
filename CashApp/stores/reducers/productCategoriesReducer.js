import { createSlice } from "@reduxjs/toolkit";

export const productCategoriesSlice = createSlice({
  name: "productCategories",
  initialState: {
    value: [
      {
        _id: "638cac6e0793c7144096b632",
        label: "fresh products",
        createdAt: "2022-12-04T14:19:26.100Z",
        updatedAt: "2022-12-04T14:19:26.100Z",
        __v: 0,
        products: [
          {
            _id: "638cac6e0793c7144096b63e",
            unit: "Kg",
            category: "638cac6e0793c7144096b632",
            label: "Tomato",
            deleted: false,
            createdAt: "2022-12-04T14:19:26.109Z",
            updatedAt: "2022-12-04T14:19:26.109Z",
            __v: 0,
            id: "638cac6e0793c7144096b63e",
          },
        ],
        id: "638cac6e0793c7144096b632",
      },
      {
        _id: "638cac6e0793c7144096b634",
        label: "grocery",
        createdAt: "2022-12-04T14:19:26.101Z",
        updatedAt: "2022-12-04T14:19:26.101Z",
        __v: 0,
        products: [
          {
            _id: "638cac6e0793c7144096b648",
            unit: "u",
            category: "638cac6e0793c7144096b634",
            label: "Pasta Barilla 1Kg",
            deleted: false,
            createdAt: "2022-12-04T14:19:26.116Z",
            updatedAt: "2022-12-04T14:19:26.116Z",
            __v: 0,
            id: "638cac6e0793c7144096b648",
          },
        ],
        id: "638cac6e0793c7144096b634",
      },
      {
        _id: "638cac6e0793c7144096b636",
        label: "liquid",
        createdAt: "2022-12-04T14:19:26.102Z",
        updatedAt: "2022-12-04T14:19:26.102Z",
        __v: 0,
        products: [
          {
            _id: "638cac6e0793c7144096b652",
            unit: "u",
            category: "638cac6e0793c7144096b636",
            label: "Heineken Beer x6 pack",
            deleted: false,
            createdAt: "2022-12-04T14:19:26.124Z",
            updatedAt: "2022-12-04T14:19:26.124Z",
            __v: 0,
            id: "638cac6e0793c7144096b652",
          },
        ],
        id: "638cac6e0793c7144096b636",
      },
      {
        _id: "638cac6e0793c7144096b638",
        label: "frozen",
        createdAt: "2022-12-04T14:19:26.103Z",
        updatedAt: "2022-12-04T14:19:26.103Z",
        __v: 0,
        products: [
          {
            _id: "638cac6e0793c7144096b65c",
            unit: "u",
            category: "638cac6e0793c7144096b638",
            label: "French fries 750g",
            deleted: false,
            createdAt: "2022-12-04T14:19:26.129Z",
            updatedAt: "2022-12-04T14:19:26.129Z",
            __v: 0,
            id: "638cac6e0793c7144096b65c",
          },
        ],
        id: "638cac6e0793c7144096b638",
      },
      {
        _id: "638cac6e0793c7144096b63a",
        label: "non-food products",
        createdAt: "2022-12-04T14:19:26.104Z",
        updatedAt: "2022-12-04T14:19:26.104Z",
        __v: 0,
        products: [
          {
            _id: "638cac6e0793c7144096b666",
            unit: "u",
            category: "638cac6e0793c7144096b63a",
            label: "Shampoo Le Petit Marseillais 350 mL",
            deleted: false,
            createdAt: "2022-12-04T14:19:26.134Z",
            updatedAt: "2022-12-04T14:19:26.134Z",
            __v: 0,
            id: "638cac6e0793c7144096b666",
          },
        ],
        id: "638cac6e0793c7144096b63a",
      },
      {
        _id: "638dd3815221bf43c2912210",
        label: "test",
        createdAt: "2022-12-05T11:18:25.442Z",
        updatedAt: "2022-12-05T11:18:25.442Z",
        __v: 0,
        products: [],
        id: "638dd3815221bf43c2912210",
      },
    ],
  },
  reducers: {
    setProductCategories: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProductCategories } = productCategoriesSlice.actions;

export default productCategoriesSlice.reducer;
