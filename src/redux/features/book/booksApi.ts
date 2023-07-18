import { IBooksResponse } from "../../../types/globalTypes";
import { api } from "../../api/apiSlice";

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<IBooksResponse, void>({
      query: () => "api/v1/books",
    }),
  }),
});

export const { useGetBooksQuery } = booksApi;
