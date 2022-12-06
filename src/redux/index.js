import { createStore } from 'redux';
import { devToolsEnhancer } from '@redux-devtools/extension';
import { ACTIONS } from './actions';

const initialState = {
  likedPosts: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.addLikedPost:
      return { ...state, likedPosts: [action.payload, ...state.likedPosts] };

    case ACTIONS.removeLikedPost:
      return {
        ...state,
        likedPosts: state.likedPosts.filter(
          (post) => post.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

const enhancer = devToolsEnhancer();

export const store = createStore(rootReducer, enhancer);
