import { signInFormData, signUpFormData } from "../../../types/globalTypes";
import { api } from "../../api/apiSlice";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data: signUpFormData) => ({
        url: `/api/v1/auth/signup`,
        method: "POST",
        body: data,
      }),
    }),
    signIn: builder.mutation({
      query: (data: signInFormData) => ({
        url: `/api/v1/auth/login`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
