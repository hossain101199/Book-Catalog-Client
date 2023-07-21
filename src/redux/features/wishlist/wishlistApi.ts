import { api } from "../../api/apiSlice";

const wishlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    setWishlist: builder.mutation({
      query: ({
        token,
        data,
      }: {
        token: string;
        data: { book: string; status: string };
      }) => ({
        url: `api/v1/wishlist`,
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["wishlist"],
    }),

    getWishlistByBookId: builder.query({
      query: ({ id, token }: { id: string; token: string }) => ({
        url: `api/v1/wishlist/${id}`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["wishlist"],
    }),
  }),
});

export const { useSetWishlistMutation, useGetWishlistByBookIdQuery } =
  wishlistApi;
