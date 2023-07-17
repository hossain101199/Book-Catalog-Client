import { api } from "../../api/apiSlice";

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "api/v1/books",
    }),
  }),
});

export const { useGetBooksQuery } = booksApi;
