import { configureStore, createReducer } from '@reduxjs/toolkit';
import { persistReducer, persistStore, PERSIST } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import likedPostsReducer from './posts/slice';

const persistConfig = {
  key: 'posts',
  storage,
};

const persistedReducer = persistReducer(persistConfig, likedPostsReducer);

const logger = (store) => (next) => (action) => {
  console.log(action.type);
  next(action);
};
// те саме
// const logger = (store) => {
//   return (next) => {
//     return (action) => {

//     }
//   }
// }

export const store = configureStore({
  reducer: {
    posts: persistedReducer,
  },
  middleware(getDefaultMiddleware) {
    const defaultMiddleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    });

    return [...defaultMiddleware, logger];
  },
});

export const persistor = persistStore(store);
