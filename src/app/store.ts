import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counterSlice'
import postsReducer from '../features/posts/postSlice';
import usersReducer from '../features/users/usersSlice';


export const store = configureStore({
    reducer: {
        count: counterReducer,
        posts: postsReducer,
        users: usersReducer
    }
})

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;