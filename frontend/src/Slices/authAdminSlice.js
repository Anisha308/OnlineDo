import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminInfo: (() => {
    try {
      
      return JSON.parse(localStorage.getItem("adminInfo")) || null;
    } catch (error) {
      
      return null;
    }
  })(),
};

const authAdminSlice = createSlice({
    name: 'authAdmin',
    initialState,
    reducers: {
        adminSetCredentials: (state, action) => {
            state.adminInfo = action.payload;
            localStorage.setItem('adminInfo',JSON.stringify(action.payload))
        },
        adminlogout: (state, action) => {
            state.adminInfo = null;
            localStorage.removeItem('adminInfo')
        }
    }
})
export const { adminSetCredentials, adminlogout } = authAdminSlice.actions;

export default authAdminSlice.reducer;