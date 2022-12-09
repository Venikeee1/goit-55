import { configureStore, createReducer } from '@reduxjs/toolkit';
import { persistReducer, persistStore, PERSIST } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import likedPostsReducer from './likedPosts/slice';

const persistConfig = {
  key: 'likedPosts',
  storage,
};

const persistedReducer = persistReducer(persistConfig, likedPostsReducer);

export const store = configureStore({
  reducer: {
    likedPosts: persistedReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    });
  },
});

export const persistor = persistStore(store);

// store.subscribe(() => {
//   localStorage.setItem(
//     'likedPosts',
//     JSON.stringify(store.getState().likedPosts.items)
//   );
// });

// const state = {
//   likedPosts: {
//     likedPosts: []
//   }
// }

// import { addLikedPost, removeLikedPost } from './actions';

// const initialState = {
//   likedPosts: [],
// };

// const likedPostsReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(addLikedPost, (state, action) => {
//       state.likedPosts.unshift(action.payload);
//     })
//     .addCase(removeLikedPost, (state, action) => {
//       state.likedPosts = state.likedPosts.filter(
//         (post) => post.id !== action.payload
//       );
//     });
// });
