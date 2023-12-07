import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: null,
    isAuthenticated: false, // Add this line
  },
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;

      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state.isAuthenticated = true; // Set authentication to true when credentials are set
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials,setAuthenticated, logout } = authSlice.actions;

export default authSlice.reducer;
