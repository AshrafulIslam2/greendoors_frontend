// features/auth/authSlice.js
import baseQuery from "@/service/baseQuery";

// export const authSlice = createSlice({
//   name: "auth", // ✅ correct key
//   initialState,
//   reducers: {
//     setCredentials: (state, action) => {
//       state.token = action.payload.token;
//       state.user = action.payload.user;
//     },
//     logout: (state) => {
//       state.token = null;
//       state.user = null;
//     },
//   },
// });
export const LoginApiSlice = createApi({
  reducerPath: "login",
  baseQuery: baseQuery,
  tagTypes: ["login"],
  endpoints: (builder) => {
    return {
      publicLogin: builder.mutation({
        query: (user) => ({
          url: `/auth/login`,
          method: "POST",
          body: user,
        }),
      }),
    };
  },
});
export const { usePublicLoginMutation } = LoginApiSlice;

// export const { setCredentials, logout } = authSlice.actions;
// export default authSlice.reducer;
