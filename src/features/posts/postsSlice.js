import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "Learning Redux Toolkit",
    content: "I've heard good things.",
  },
  {
    id: "2",
    title: "Slices...",
    content: "The more I say slice, the more I want pizza.",
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    //when we type a function in the reducers, the createSlice generates an action function with the same name, we can use this to export the function from postsSlice.actions
    postAdded: {
      reducer(state, action) {
        //react toolkit allow us to push data direct into the state when inside the createSlice function instead of needing to call the setState function
        //this happend because of immer js, that is used inside react toolkit
        state.push(action.payload);
      },
      //we can abstract the logic that post in our goblal state, we can use a prepared callback for this
      //the prepared callback will be responsible for generating the id, formating the data and returning the object with the payload
      //the component that uses this payload, don't have to know the structure of the state, everything is going to be handled inside the slice
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
          },
        };
      },
    },
  },
});

//we can use this to retrieve all posts without the need to change all componentes
//that use this information is case the logic change from state.posts to something else
export const selectAllPosts = (state) => state.posts;

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
