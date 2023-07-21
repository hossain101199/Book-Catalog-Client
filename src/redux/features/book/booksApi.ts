import { IBook, ICreateBook } from "../../../types/globalTypes";
import { api } from "../../api/apiSlice";

interface IQueryParams {
  searchTerm?: string;
  genre?: string;
  publicationYear?: string;
}

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<IBook[], IQueryParams>({
      query: (params) => {
        const { searchTerm, genre, publicationYear } = params ?? {};
        let queryString = `api/v1/books`;
        const queryParams: string[] = [];
        if (searchTerm) {
          queryParams.push(`searchTerm=${searchTerm}`);
        }
        if (genre) {
          queryParams.push(`genre=${genre}`);
        }
        if (publicationYear) {
          queryParams.push(`publicationYear=${publicationYear}`);
        }
        if (queryParams.length > 0) {
          queryString += `?${queryParams.join("&")}`;
        }
        return queryString;
      },
    }),

    getSingleBook: builder.query<IBook, string>({
      query: (id) => `api/v1/books/${id}`,
    }),

    createdBook: builder.mutation({
      query: ({ token, data }: { token: string; data: ICreateBook }) => ({
        url: `api/v1/books`,
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: data,
      }),
    }),

    deleteBook: builder.mutation({
      query: ({ token, id }: { token: string; id: string }) => ({
        url: `api/v1/books/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  useCreatedBookMutation,
  useDeleteBookMutation,
} = booksApi;
