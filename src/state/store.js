// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { movieApiSlice } from "./movies/movieApiSlice";
import sidebarReducer from "./helper_slice/sidebarSlice";
import modelOpenReducer from "./helper_slice/modelOpenSlice";
import { userApiSlice } from "./user/userSlice";
import { depositApiSlice } from "./deposit/depositApiSlice";

const store = configureStore({
  reducer: {
    [movieApiSlice.reducerPath]: movieApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [depositApiSlice.reducerPath]: depositApiSlice.reducer, // add this line
    sidebar: sidebarReducer,
    model: modelOpenReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      movieApiSlice.middleware,
      userApiSlice.middleware,
      depositApiSlice.middleware // add this line
      // LoginApiSlice.middleware
    ),
});

export default store;
