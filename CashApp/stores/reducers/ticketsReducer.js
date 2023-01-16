import { createSlice } from "@reduxjs/toolkit";

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState: {
    value: [],
  },
  reducers: {
    setTickets: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTickets } = ticketsSlice.actions;

export default ticketsSlice.reducer;
