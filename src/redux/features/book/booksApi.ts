import { IBook, IBooksResponse } from "../../../types/globalTypes";
import { api } from "../../api/apiSlice";

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<IBooksResponse, void>({
      query: () => "api/v1/books",
    }),
    getSingleBook: builder.query<IBook, string>({
      query: (id) => `api/v1/books/${id}`,
    }),
  }),
});

export const { useGetBooksQuery, useGetSingleBookQuery } = booksApi;
