import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

//to create async functions in the redux, we need to create a async thunk. The first argument is a prefix for the generated action type and the second is a callback that return a promise
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost);
    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    //when we type a function in the reducers, the createSlice generates an action function with the same name, we can use this to export the function from postsSlice.actions
    postAdded: {
      reducer(state, action) {
        //react toolkit allow us to push data direct into the state when inside the createSlice function instead of needing to call the setState function
        //this happend because of immer js, that is used inside react toolkit
        state.posts.push(action.payload);
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
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        //again, because we are inside the slice, we don't need to use the setState because of immerJS
        existingPost.reactions[reaction]++;
      }
    },
  },
  //the extra reducers handle something that have not been defined inside the normal reducers part of the slice
  extraReducers(builder) {
    //the cases are listening to the pormise status action type, that are dispatch by the thunk, then we can set our state according
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";

        //add date and reactions because the api that we are using don't have these properties
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };

          return post;
        });

        //add any fetched posts to the array
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        console.log(action.payload);
        state.posts.push(action.payload);
      });
  },
});

//we can use this to retrieve all posts without the need to change all componentes
//that use this information is case the logic change from state.posts.posts to something else
export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
