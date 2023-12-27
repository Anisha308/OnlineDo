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
      const { payload } = action;
      state.instructorInfo = payload;
      localStorage.setItem("instructorInfo", JSON.stringify(payload));
  console.log("Local storage set:", payload);

    },
    logout: (state, action) => {
      state.instructorInfo = null;
      localStorage.removeItem("instructorInfo");
    },
  },
});

export const { instructorSetCredentials, logout } = authInstructorSlice.actions;

export default authInstructorSlice;