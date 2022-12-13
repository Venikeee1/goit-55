import { createSlice, createDraftSafeSelector } from '@reduxjs/toolkit';
import { fetchPosts } from './operations';

const initialState = {
  items: [],
  likedItems: [],
  nbPages: 1,
  loading: false,
  error: null,
  status: 'idle',
};

const postsSlice = createSlice({
  name: 'likedPosts',
  initialState,
  reducers: {
    addPost(state, action) {
      state.likedItems.unshift(action.payload);
    },
    removePost(state, action) {
      state.likedItems = state.likedItems.filter(
        (post) => post.id !== action.payload
      );
    },
  },
  extraReducers: {
    [fetchPosts.pending](state, action) {
      state.loading = true;
      state.status = 'loading';
    },

    [fetchPosts.fulfilled](state, { payload }) {
      state.items = payload.hits;
      state.loading = false;
      state.error = null;
      state.status = 'fulfilled';
      state.nbPages = payload.nbPages;
    },

    [fetchPosts.rejected](state, action) {
      state.loading = false;
      state.error = action.error;
      state.nbPages = 1;
      state.status = 'rejected';
    },
  },
});

export const { addPost, removePost } = postsSlice.actions;
export default postsSlice.reducer;

export const selectPosts = (state) => state.posts;

export const getLikedPosts = createDraftSafeSelector(
  selectPosts,
  (state) => state.likedItems
);

const obj = {
  a: {
    c: {
      d: 54,
    },
  },
};

JSON.stringify();
