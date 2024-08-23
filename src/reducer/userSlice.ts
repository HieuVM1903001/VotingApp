import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../utils/model";
import { _getUsers } from "../utils/_DATA";

interface UserState {
  users: User[];
  authedUser: User | undefined;
}
const initialState: UserState = {
  users: [],
  authedUser: undefined,
};

export const getAllUsers = createAsyncThunk("user/fetch", async () => {
  const users = await _getUsers();
  return Object.values(users) as User[];
});

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.authedUser = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
