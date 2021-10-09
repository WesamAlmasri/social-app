import { CommentType } from '../../types';

export type CommentsStateType = {
  comments: CommentType[];
};

export type UpdateCommentsListActionType = {
  type: string;
  payload: CommentType[] | string;
};



export type DispatchType = (args: UpdateCommentsListActionType) => UpdateCommentsListActionType