import { api } from "../../api/apiSlice";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: `/api/v1/auth/signup`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignUpMutation } = authApi;
