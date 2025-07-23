import baseQuery from "@/service/baseQuery";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieApiSlice = createApi({
  reducerPath: "movies",
  baseQuery: baseQuery,
  tagTypes: ["movies"],
  endpoints: (builder) => {
    return {
      publicGetMovies: builder.query({
        query: () => "/movies",
        providesTags: ["movies"],
      }),
      addMovies: builder.mutation({
        query: (movie) => ({
          url: `movies`,
          method: "POST",
          body: movie,
        }),
        invalidatesTags: ["movies"],
      }),
      updateMovies: builder.mutation({
        query: (movie) => {
          const { id, ...body } = movie;
          return {
            url: `movies/${id}`,
            method: "PUT",
            body: body,
          };
        },
        invalidatesTags: ["movies"],
      }),
    };
  },
});

export const {
  useAddMoviesMutation,
  usePublicGetMoviesQuery,
  useUpdateMoviesMutation,
} = movieApiSlice;
