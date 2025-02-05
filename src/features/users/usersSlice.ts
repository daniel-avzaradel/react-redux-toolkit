import { createSlice } from "@reduxjs/toolkit";
import { RootStore } from "../../app/store";

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
    reducers: {}
})

export const selectAllUsers = (state: RootStore) => state.users;

export default usersSlice.reducer