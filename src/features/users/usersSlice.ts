import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootStore } from "../../app/store";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async() => {
  const response = await axios.get(USERS_URL)
  return [...response.data];
})

interface UsersSlice {
  id: string,
  name: string
}

const initialState: UsersSlice[] = [
    { id: '0', name: 'Dude Lebowski' },
    { id: '1', name: 'Neil Young' },
    { id: '2', name: 'Dave Gray' }
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder)  => {
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
        return action.payload
      })
    },
})

export const selectAllUsers = (state: RootStore) => state.users;

export default usersSlice.reducer