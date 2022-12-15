import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const likedPostsSlice = createSlice({
  name: 'likedPosts',
  initialState,
  reducers: {
    addPost(state, action) {
      const postId = action.payload;
      state.items.unshift(postId);
    },
    removePost(state, action) {
      state.items = state.items.filter((id) => id !== action.payload);
    },
  },
});

export default likedPostsSlice.reducer;
export const { addPost, removePost } = likedPostsSlice.actions;

export const selectLikedPostsState = (state) => state.likedPosts;

export const selectLikedPostsIds = createDraftSafeSelector(
  selectLikedPostsState,
  (state) => state.items
);
