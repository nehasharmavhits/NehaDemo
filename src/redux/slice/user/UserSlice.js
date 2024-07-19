import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./UserService";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
  },
  reducers: {
    logout: (state) => {
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      console.log(action?.payload, 2222);
      state.userData = action?.payload?.data;
      state.token = action?.payload?.data?.token;
    });
  },
});

export const { updateUser, logout } = UserSlice.actions;
export default UserSlice.reducer;
