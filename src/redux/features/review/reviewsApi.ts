import { IReviewResponse } from "./../../../types/globalTypes";
import { api } from "../../api/apiSlice";

const reviewsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getreviewReviews: builder.query<IReviewResponse, string>({
      query: (id) => `api/v1/reviews/${id}`,
    }),
  }),
});

export const { useGetreviewReviewsQuery } = reviewsApi;
