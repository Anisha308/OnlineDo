import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminInfo: localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo"))
    : null,
};

const authAdminSlice = createSlice({
    name: 'authAdmin',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.adminInfo = action.payload;
            localStorage.setItem('adminInfo',JSON.stringify(action.payload))
        },
        logout: (state, action) => {
            state.adminInfo = null;
            localStorage.removeItem('adminInfo')
        }
    }
})
export const { adminSetCredentials, adminlogout } = authAdminSlice.actions;

export default authAdminSlice.reducer;