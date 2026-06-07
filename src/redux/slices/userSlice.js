import { createSlice } from '@reduxjs/toolkit';
import { mockData } from '../../data/mockData.js';

const userSlice = createSlice({
  name: 'user',
  initialState: { current: null, users: mockData.users },
  reducers: {
    setUser(state, action) {
      state.current = action.payload;
    },
    logout(state) {
      state.current = null;
    },
    addUser(state, action) {
      state.users.push(action.payload);
    }
  }
});

export const { setUser, logout, addUser } = userSlice.actions;
export default userSlice.reducer;
