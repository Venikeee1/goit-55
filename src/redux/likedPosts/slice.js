import { createSlice, createDraftSafeSelector } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const likedPostsSlice = createSlice({
  name: 'likedPosts',
  initialState,
  reducers: {
    addPost(state, action) {
      state.items.unshift(action.payload);
    },
    removePost(state, action) {
      state.items = state.items.filter((post) => post.id !== action.payload);
    },
  },
});

export const { addPost, removePost } = likedPostsSlice.actions;
export default likedPostsSlice.reducer;

const selectLikedPosts = (state) => state.likedPosts;

export const getLikedPosts = createDraftSafeSelector(
  selectLikedPosts,
  (state) => state.items
);
