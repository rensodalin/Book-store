import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,  // corrected here
    role: "user",
    user: null,
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;  // corrected here
    },
    logout(state) {
      state.isLoggedIn = false;  // corrected here
      state.user = null;
    },
    changeRole(state, action) {
      state.role = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
