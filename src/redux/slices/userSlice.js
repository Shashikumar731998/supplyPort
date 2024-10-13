import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "user",
  initialState: {
    PartyName: "",
    address: "", // Added address to the initial state
    email: "",
    token: "",
    refreshToken: "",
    designation: "",
    avatar: "",
  },
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUser: (state) => {
      return {
        PartyName: "",
        address: "", // Reset address
        email: "",
        token: "",
        refreshToken: "",
        designation: "",
        avatar: "",
      };
    },
  },
});

export const { setUser, clearUser } = slice.actions;

export const getUser = (state) => state.user;

export default slice.reducer;
