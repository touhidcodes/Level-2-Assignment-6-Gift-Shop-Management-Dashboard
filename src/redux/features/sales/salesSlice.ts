import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SalesIdState {
  salesId: string;
}

const initialState: SalesIdState = {
  salesId: "",
};

export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    addSalesId: (state, action: PayloadAction<string>) => {
      state.salesId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addSalesId } = salesSlice.actions;

export default salesSlice.reducer;
