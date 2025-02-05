import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootStore } from "../../app/store";

interface PostsState {
  id: string,
  title: string,
  content: string,
  userId?: string
}

const initialState: PostsState[] = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: "I've heard good things."
    },
    {
        id: '2',
        title: 'Slices...',
        content: "The more I say slice, the more I want pizza."
    }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action: PayloadAction<PostsState>) => {
                state.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId,
                    }
                }
            }
        }
    }
})

export const selectAllPosts = (state: RootStore) => state.posts;

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer