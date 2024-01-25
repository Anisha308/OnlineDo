import { apiSlice } from "./apiSlice";
const ADMIN_URL = "/api/admin";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    adminlogout: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/logout`,
        method: "POST",
      }),
    }),
    getUserList: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/userlist`,
        method: "GET",
      }),
    }),

    getInstructorlist: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/instructorlist`,
        method: "GET",
      }),
    }),
    blockuser: builder.mutation({
      query: (userId) => ({
        url: `${ADMIN_URL}/block-user/${userId}`,
        method: "POST",
        body: { userId },
      }),
    }),
    blockInstructor: builder.mutation({
      query: ({ instructorId }) => ({
        url: `${ADMIN_URL}/block-instructor/${instructorId}`,
        method: "POST",
        body: { instructorId },
      }),
    }),
    unblockInstructor: builder.mutation({
      query: ({ instructorId }) => ({
        url: `${ADMIN_URL}/unblock-instructor/${instructorId}`,
        method: "PUT",
        body: { instructorId },
      }),
    }),
    verifyInstructor: builder.mutation({
      query: ({ instructorId }) => ({
        url: `${ADMIN_URL}/verify-instructor/${instructorId}`,
        method: "PUT",
        body: instructorId,
      }),
    }),
  }),
});
export const {
  useAdminLoginMutation,
  useAdminlogoutMutation,
  useGetUserListQuery,
  useBlockuserMutation,
  useVerifyInstructorMutation,
  useGetInstructorlistQuery,
  useBlockInstructorMutation,
  useUnblockInstructorMutation,
} = adminApiSlice;
