// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { movieApiSlice } from "./movies/movieApiSlice";
import sidebarReducer from "./helper_slice/sidebarSlice";
import modelOpenReducer from "./helper_slice/modelOpenSlice";
import { userApiSlice } from "./user/userSlice";
import { depositApiSlice } from "./deposit/depositApiSlice";
import { LoginApiSlice } from "./Auth/authSlice";

const store = configureStore({
  reducer: {
    [movieApiSlice.reducerPath]: movieApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [depositApiSlice.reducerPath]: depositApiSlice.reducer,
    [LoginApiSlice.reducerPath]: LoginApiSlice.reducer,
    sidebar: sidebarReducer,
    model: modelOpenReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      movieApiSlice.middleware,
      userApiSlice.middleware,
      depositApiSlice.middleware,
      LoginApiSlice.middleware
    ),
});

export default store;
