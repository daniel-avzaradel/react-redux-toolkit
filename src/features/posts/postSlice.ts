import { createAsyncThunk, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootStore } from "../../app/store";
import { sub } from "date-fns";
import axios from "axios";

const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts", async () => {
    const response = await axios.get(POST_URL)
    console.log(response.data);
    return [...response.data];
  }
)

interface Reactions {
  thumbsUp: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
}

export interface PostsState {
  id: string;
  title: string;
  body: string;
  date: string;
  reactions: Reactions;
  userId?: string;
}

export interface PostsApiState {
  posts: PostsState[],
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: Error | null | string
}

const initialState: PostsApiState = {
  posts: [],
  status: 'idle',
  error: null
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action: PayloadAction<PostsState>) => {
        state.posts.push(action.payload);
      },
      prepare(title, body, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
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
    reactionsAdded: (state, action: PayloadAction<{postId: string, reaction: string}>) => {
        const { postId, reaction } = action.payload
        const existingPost = state.posts.find((post: PostsState)  => post.id === postId)
        if(existingPost && existingPost.reactions && reaction in existingPost.reactions) {
            existingPost.reactions[reaction as keyof typeof existingPost.reactions]++
        }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<PostsApiState['posts']>) => {
      state.status = 'succeeded';
      let min = 1;
      const loadedPosts = action.payload.map(post => {
        post.date = sub(new Date(), {minutes: min++}).toISOString();
        post.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0
        }
        return post;
      });

      state.posts = state.posts.concat(loadedPosts)
    })
    .addCase(fetchPosts.rejected, (state, action: PayloadAction<any>) => {
      state.status = 'failed';
      state.error = action.payload.message
    })
  }
});

export const selectAllPosts = (state: RootStore) => state.posts.posts;
export const selectError = (state: RootStore) => state.posts.error;
export const selectStatus = (state: RootStore) => state.posts.status;

export const { postAdded , reactionsAdded} = postsSlice.actions;

export default postsSlice.reducer;
