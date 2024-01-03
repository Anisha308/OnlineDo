import { apiSlice } from "./apiSlice";
const INSTRUCT_URL = "/api/instructor";

export const instructApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    instructorSignUp: builder.mutation({
      query: (data) => ({
        url: `${INSTRUCT_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    instructorLogin: builder.mutation({
      query: (data) => ({
        url: `${INSTRUCT_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    addcourse: builder.mutation({
      query: (data) => ({
        url: `${INSTRUCT_URL}/addcourse/${data.instructorId}`, // Pass instructorId as a parameter
        method: "POST",
        body: data,
      }),
    }),

    getInstructProfile: builder.query({
      query: (instructorId) => ({
        url: `${INSTRUCT_URL}/showprofile/${instructorId}`, // Assuming this endpoint returns user profile details
        method: "GET",
      }),
    }),
    updateInstructProfile: builder.mutation({
      query: (data) => ({
        url: `${INSTRUCT_URL}/showprofile/${data.instructorId}`,
        method: "PUT",
        body: data,
      }),
    }),
    getCourse: builder.query({
      query: (instructorId) => ({
        url: `${INSTRUCT_URL}/${instructorId}/courselist`, // Assuming this endpoint returns user profile details
        method: "GET",
      }),
    }),
    instructorlogout: builder.mutation({
      query: () => ({
        url: `${INSTRUCT_URL}/logout`,
        method: "POST",
      }),
    }),
    instructverifyOtp: builder.mutation({
      query: (data) => ({
        url: `${INSTRUCT_URL}/instructotpverify`,
        method: "POST",
        body: data,
      }),
    }),
  })
})

export const {
  useInstructorSignUpMutation,
  useInstructorLoginMutation,
  useGetInstructProfileQuery,
useUpdateInstructProfileMutation,
  useAddcourseMutation,
  useGetCourseQuery,
  useInstructorlogoutMutation,
  useInstructverifyOtpMutation
} = instructApiSlice;
