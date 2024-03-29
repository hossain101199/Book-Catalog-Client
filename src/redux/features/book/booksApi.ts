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
      providesTags: ["updated", "created", "deleted"],
    }),

    getSingleBook: builder.query<IBook, string>({
      query: (id) => `api/v1/books/${id}`,
      providesTags: ["updated", "created", "deleted"],
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
      invalidatesTags: ["created"],
    }),

    deleteBook: builder.mutation({
      query: ({ token, id }: { token: string; id: string }) => ({
        url: `api/v1/books/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: ["deleted"],
    }),

    updateBook: builder.mutation({
      query: ({
        id,
        token,
        data,
      }: {
        id: string;
        token: string;
        data: Partial<ICreateBook>;
      }) => ({
        url: `api/v1/books/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["updated"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  useCreatedBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = booksApi;
