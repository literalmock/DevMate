import { createSlice } from "@reduxjs/toolkit";


const feedSlice = createSlice({
  name: 'feed',
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      if (!Array.isArray(state)) {
        return state;
      }
      return state.filter((user) => user._id !== action.payload);
    },
    removeFeed: (state,action) => {
        return null
    }
  },
});

export default feedSlice.reducer;
export const { addFeed, removeUserFromFeed, removeFeed } = feedSlice.actions;