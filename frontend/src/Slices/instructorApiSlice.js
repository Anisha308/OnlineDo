import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  instructorInfo: (() => {
    try {
      return JSON.parse(localStorage.getItem("instructorInfo")) || null;
    } catch (error) {
      return null;
    }
  })(),
};
const authInstructorSlice = createSlice({
  name: "authInstructor",
  initialState,
  reducers: {
    instructorSetCredentials: (state, action) => {
      state.instructorInfo = action.payload;
      localStorage.setItem("instructorInfo", JSON.stringify(action.payload));

    },
    instructlogout: (state, action) => {
      state.instructorInfo = null;
      localStorage.removeItem("instructorInfo");
    },
  },
});

export const { instructorSetCredentials, instructlogout } = authInstructorSlice.actions;

export default authInstructorSlice.reducer;