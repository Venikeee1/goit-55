import { configureStore, createReducer } from '@reduxjs/toolkit';
import { persistReducer, persistStore, PERSIST } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import postsReducer from './posts/slice';
import likedPostsReducer from './likedPosts/slice';
import userReducer from './auth/slice';

const likedPostsConfig = {
  key: 'posts',
  storage,
};

const userConfig = {
  key: 'user',
  storage,
  whitelist: ['token'],
};

const persistedLikedPostsReducer = persistReducer(
  likedPostsConfig,
  likedPostsReducer
);
const persistedUserReducer = persistReducer(userConfig, userReducer);

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    likedPosts: persistedLikedPostsReducer,
    user: persistedUserReducer,
  },
  middleware(getDefaultMiddleware) {
    const defaultMiddleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    });

    return [...defaultMiddleware];
  },
});

export const persistor = persistStore(store);
