import { createAsyncThunk, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootStore } from "../../app/store";
import { sub } from "date-fns";
import axios from "axios";

const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts", async () => {
    const response = await axios.get(POST_URL)
    return [...response.data];
  }
)

export const addNewPost = createAsyncThunk(
  "posts/addNewPost", async (initialPost: any) => {
    const response = axios.post(POST_URL, initialPost)
    return (await response).data;
  }
)

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost: Partial<PostsState>) => {
  const { id } = initialPost;
  try {
      const response = await axios.put(`${POST_URL}/${id}`, initialPost)
      return response.data
  } catch (err) {
      return initialPost;
  }
})

interface Reactions {
  thumbsUp: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
}

export interface PostsState {
  id: number;
  title: string;
  body: string;
  date: string;
  reactions: Reactions;
  userId?: number | undefined;
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
            id: Number(nanoid()),
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
        const existingPost = state.posts.find((post: PostsState)  => post.id === Number(postId))
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
    .addCase(addNewPost.fulfilled, (state, action: PayloadAction<PostsState>) => {
      action.payload.userId = Number(action.payload.userId);
      action.payload.date = new Date().toISOString();
      action.payload.reactions = {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0
      }
      state.posts.push(action.payload)
    })
    .addCase(updatePost.fulfilled, (state, action) => {
      if (!action.payload?.id) {
          console.log('Update could not complete')
          console.log(action.payload)
          return;
      }
      const { id } = action.payload;
      action.payload.date = new Date().toISOString();
      const posts = state.posts.filter(post => post.id !== id);
      state.posts = [...posts, action.payload];
  })
  }
});

export const selectAllPosts = (state: RootStore) => state.posts.posts;
export const selectError = (state: RootStore) => state.posts.error;
export const selectStatus = (state: RootStore) => state.posts.status;

export const selectPostById = (state: RootStore, postId: string) => {
  return state.posts.posts.find(post => post.id === Number(postId))
}

export const { postAdded , reactionsAdded} = postsSlice.actions;

export default postsSlice.reducer;
