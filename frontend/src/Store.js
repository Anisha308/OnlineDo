import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice"
import { apiSlice } from "./Slices/apiSlice";
import adminAuthReducer from "./Slices/authAdminSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    adminAuth: adminAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
