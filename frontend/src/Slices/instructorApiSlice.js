import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  instructorInfo: localStorage.getItem("instructorInfo")
    ? JSON.parse(localStorage.getItem("instructorInfo"))
    : null,
};

const authInstructorSlice = createSlice({
  name: "authInstructor",
  initialState,
  reducers: {
    instructorSetCredentials: (state, action) => {
      state.instructorInfo = action.payload;
      localStorage.setItem("instructorInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.instructorInfo = null;
      localStorage.removeItem("instructorInfo");
    },
  },
});

export const { instructorSetCredentials, adminlogout } = authInstructorSlice.actions;

export default authInstructorSlice;