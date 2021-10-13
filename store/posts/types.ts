import { PostType } from '../../types';

export type PostsStateType = {
  posts: PostType[];
};

export type UpdatePostsListActionType = {
  type: string;
  payload: PostType[] | string;
};



export type PostsListDispatchType = (args: UpdatePostsListActionType) => UpdatePostsListActionType