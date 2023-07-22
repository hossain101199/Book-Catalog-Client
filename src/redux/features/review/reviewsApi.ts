import { IReviewResponse, bookReviewData } from "./../../../types/globalTypes";
import { api } from "../../api/apiSlice";

const reviewsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<IReviewResponse, string>({
      query: (id) => `api/v1/reviews/${id}`,
      providesTags: ["comments"],
    }),
    postComment: builder.mutation({
      query: ({ token, data }: { token: string; data: bookReviewData }) => ({
        url: `api/v1/reviews`,
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["comments"],
    }),
  }),
});

export const { usePostCommentMutation, useGetReviewsQuery } = reviewsApi;
