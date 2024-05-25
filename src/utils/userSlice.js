import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    //addUser,removeUser are => reducer Functions
    addUser: (state, action) => {
      return action.payload; // initialState will become => action.payload
    },

    removeUser: (state, action) => {
      return null;
    },
  },
});

//also export actions
export const { addUser, removeUser } = userSlice.actions;

//by default we will export the reducer and will import that inside our store
export default userSlice.reducer;
