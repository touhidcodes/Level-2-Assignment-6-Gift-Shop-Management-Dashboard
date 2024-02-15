import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProductIdState {
  productIds: string[];
  duplicateId: string;
}

const initialState: ProductIdState = {
  productIds: [],
  duplicateId: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProductId: (state, action: PayloadAction<string>) => {
      state.productIds = [...state.productIds, action.payload];
    },

    removeProductId: (state) => {
      state.productIds = [];
    },
    addDuplicateProductId: (state, action: PayloadAction<string>) => {
      state.duplicateId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProductId, removeProductId, addDuplicateProductId } =
  productSlice.actions;

export default productSlice.reducer;
