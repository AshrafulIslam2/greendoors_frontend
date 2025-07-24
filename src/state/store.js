// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { movieApiSlice } from "./movies/movieApiSlice";
import authReducer, { LoginApiSlice } from "./Auth/authSlice";
import sidebarReducer from "./helper_slice/sidebarSlice";
import { userApiSlice } from "./user/userSlice";

const store = configureStore({
  reducer: {
    // auth: authReducer, // ✅ must match what you call in getState().auth.token
    [movieApiSlice.reducerPath]: movieApiSlice.reducer,
    [LoginApiSlice.reducerPath]: LoginApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    sidebar: sidebarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      movieApiSlice.middleware,
      userApiSlice.middleware,
      LoginApiSlice.middleware
    ),
});

export default store;
