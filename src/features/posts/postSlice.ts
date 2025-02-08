import { createAsyncThunk, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootStore } from "../../app/store";
// import { sub } from "date-fns";
import axios from "axios";

const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts", async () => {
    const response = await axios.get(POST_URL)
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
  content: string;
  date: string;
  reactions: Reactions;
  userId?: string;
}

export interface PostsApiState {
  posts: PostsState[],
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: Error | null
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
    reactionsAdded: (state, action: PayloadAction<{postId: string, reaction: string}>) => {
        const { postId, reaction } = action.payload
        const existingPost = state.posts.find((post: PostsState)  => post.id === postId)
        if(existingPost && existingPost.reactions && reaction in existingPost.reactions) {
            existingPost.reactions[reaction as keyof typeof existingPost.reactions]++
        }
    }
  }
});

export const selectAllPosts = (state: RootStore) => state.posts.posts;

export const { postAdded , reactionsAdded} = postsSlice.actions;

export default postsSlice.reducer;
