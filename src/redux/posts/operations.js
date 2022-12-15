import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticles } from '../../api/articlesApi';

export const fetchPosts = createAsyncThunk(
  'posts/fetchByPage',
  async ({ query, page = 1 }, thunkAPI) => {
    const { dispatch, fulfillWithValue, rejectWithValue } = thunkAPI;

    if (page < 0) {
      rejectWithValue('page should be greater than 0');
      return;
    }
    // fulfillWithValue('ASDASDAS')
    const response = await fetchArticles(query, page);

    return response.data;
  }
);

export const fetchLikedPosts = createAsyncThunk(
  'posts/liked',
  async (ids) => {}
);
