import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-catalog-server-hossain101199.vercel.app",
  }),
  tagTypes: ["comments", "updated", "created", "deleted", "wishlist"],
  endpoints: () => ({}),
});
