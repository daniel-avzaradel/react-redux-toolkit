import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootStore } from "../../app/store";
import { sub } from "date-fns";

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

const initialState: PostsState[] = [
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
    date: sub(new Date(), { minutes: 15 }).toISOString(),
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
    postAdded: {
      reducer: (state, action: PayloadAction<PostsState>) => {
        state.push(action.payload);
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
        const existingPost = state.find((post: PostsState)  => post.id === postId)
        if(existingPost && existingPost.reactions && reaction in existingPost.reactions) {
            existingPost.reactions[reaction as keyof typeof existingPost.reactions]++
        }
    }
  },
});

export const selectAllPosts = (state: RootStore) => state.posts;

export const { postAdded , reactionsAdded} = postsSlice.actions;

export default postsSlice.reducer;
