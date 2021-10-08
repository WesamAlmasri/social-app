import { PostType } from '../../types';
import * as actionTypes from './actionTypes';
import { UpdatePostsListActionType } from './types';

export const getPosts = (posts: PostType[]) => {
  const action: UpdatePostsListActionType = {
    type: actionTypes.GET_POSTS,
    payload: posts,
  };

  return action;
};


export const updatePost = (id: string) => {
  const action: UpdatePostsListActionType = {
    type: actionTypes.UPDATE_POST,
    payload: id,
  };

  return action;
};

export const deletePost = (id: string) => {
  const action: UpdatePostsListActionType = {
    type: actionTypes.DELETE_POST,
    payload: id,
  };

  return action;
};