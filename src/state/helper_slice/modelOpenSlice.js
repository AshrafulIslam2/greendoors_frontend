import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModelOpen: true,
};
const modelOpenSlice = createSlice({
  name: "modelOpen",
  initialState,
  reducers: {
    openModle: (state) => {
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
export const { openModle, closeModel, toggleModel } = modelOpenSlice.actions;
export default modelOpenSlice.reducer;
