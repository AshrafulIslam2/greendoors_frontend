// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { movieApiSlice } from "./movies/movieApiSlice";
import sidebarReducer from "./helper_slice/sidebarSlice";
import modelOpenReducer from "./helper_slice/modelOpenSlice";
import { userApiSlice } from "./user/userSlice";

const store = configureStore({
  reducer: {
    [movieApiSlice.reducerPath]: movieApiSlice.reducer,
    // [LoginApiSlice.reducerPath]: LoginApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    sidebar: sidebarReducer,
    model: modelOpenReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      movieApiSlice.middleware,
      userApiSlice.middleware
      // LoginApiSlice.middleware
    ),
});

export default store;
