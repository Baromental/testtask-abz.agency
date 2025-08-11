// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './user/slice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;
