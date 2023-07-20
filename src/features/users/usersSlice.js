import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Obi-Wan Kenobi" },
  { id: "1", name: "Luke Skywalker" },
  { id: "2", name: "Darth Vader" },
];

const usersSlice = createSlice({ name: "users", initialState, reducers: {} });

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
