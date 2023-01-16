import { createSlice } from "@reduxjs/toolkit";

export const productsUnitsSlice = createSlice({
  name: "productsUnits",
  initialState: {
    value: [
      {
        _id: "u",
        label: "U",
      },
      {
        _id: "Kg",
        label: "KG",
      },
      {
        _id: "L",
        label: "L",
      },
    ],
  },
  reducers: {
    setproductsUnits: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setproductsUnits } = productsUnitsSlice.actions;

export default productsUnitsSlice.reducer;
