import { createAction } from '@reduxjs/toolkit';

export const addLikedPost = createAction('likedPosts/add');
export const removeLikedPost = createAction('likedPosts/remove');
