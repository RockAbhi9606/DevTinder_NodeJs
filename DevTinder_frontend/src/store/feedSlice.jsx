import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },

    removeFeedFromList: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },

    removeFeed: (state, action) => {
      return null;
    },
  },
});

export const { addFeed, removeFeed, removeFeedFromList } = feedSlice.actions;
export default feedSlice.reducer;
