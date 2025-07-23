const { fetchBaseQuery } = require("@reduxjs/toolkit/query");

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3200",
  prepareHeaders: (headers, { getState, endpoint }) => {
    const skipToken = endpoint?.startsWith("public"); // ✅ fix typo and use optional chaining
    if (!skipToken) {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

export default baseQuery;
