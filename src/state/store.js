// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { movieApiSlice } from "./movies/movieApiSlice";
import authReducer, { LoginApiSlice } from "./Auth/authSlice";

const store = configureStore({
  reducer: {
    // auth: authReducer, // ✅ must match what you call in getState().auth.token
    [movieApiSlice.reducerPath]: movieApiSlice.reducer,
    [LoginApiSlice.reducerPath]: LoginApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      movieApiSlice.middleware,
      LoginApiSlice.middleware
    ),
});

export default store;
