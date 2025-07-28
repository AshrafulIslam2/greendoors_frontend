import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModelOpen: false,
};
const modelOpenSlice = createSlice({
  name: "modelOpen",
  initialState,
  reducers: {
    openModel: (state) => {
      state.isModelOpen = true;
    },
    closeModel: (state) => {
      state.isModelOpen = false;
    },
    toggleModel: (state) => {
      state.isModelOpen = !state.isModelOpen;
    },
  },
});
export const { openModel, closeModel, toggleModel } = modelOpenSlice.actions;
export default modelOpenSlice.reducer;
