import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: "1",
    title: "Learning Redux Toolkit",
    content: "I've heard good things.",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: "2",
    title: "Slices...",
    content: "The more I say slice, the more I want pizza.",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
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
      //the prepared callback will be responsable for generating the id, formating the data and returning the object with the payload
      //the component that uses this payload, don't have to know the structure of the state, everything is going to be handled inside the slice
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        //again, because we are inside the slice, we don't need to use the setState because of immerJS
        existingPost.reactions[reaction]++;
      }
    },
  },
});

//we can use this to retrieve all posts without the need to change all componentes
//that use this information is case the logic change from state.posts to something else
export const selectAllPosts = (state) => state.posts;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
