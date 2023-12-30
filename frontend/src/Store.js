import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice"
import { apiSlice } from "./Slices/apiSlice";
import authAdminReducer from "./Slices/authAdminSlice";
import { adminApiSlice } from "./Slices/adminApiSlice"; // Import adminApiSlice
import authInstructorReducer from './Slices/instructorApiSlice'
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [adminApiSlice.reducerPath]: adminApiSlice.reducer, // Include adminApiSlice.reducer

    auth: authReducer,
    authAdmin: authAdminReducer,
    instructorAuth: authInstructorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
