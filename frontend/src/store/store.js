import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // if you have a userSlice

const store = configureStore({
  reducer: {
    user: userReducer, // if you have a userSlice
  },
});

export default store;
