export const ACTIONS = {
  addLikedPost: 'likedPosts/add',
  removeLikedPost: 'likedPosts/remove',
};

export const addLikedPost = (post) => {
  return {
    type: ACTIONS.addLikedPost,
    payload: post,
  };
};

export const removeLikedPost = (id) => {
  return {
    type: ACTIONS.removeLikedPost,
    payload: id,
  };
};
