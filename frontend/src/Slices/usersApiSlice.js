import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/users";


export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/profile/${userId}`, // Assuming this endpoint returns user profile details
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile/${data.userId}`,
        method: "PUT",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/otpverify`,
        method: "POST",
        body: data,
      }),
    }),
    getAllCourse: builder.query({
      query: () => ({
        url: `${USERS_URL}/getcourse`, // Assuming this endpoint returns user profile details
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useVerifyOtpMutation,
useGetAllCourseQuery
   } =
  userApiSlice;