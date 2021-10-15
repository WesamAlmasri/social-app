import { CommentType } from '../../types';
import * as actionTypes from './actionTypes';
import { UpdateCommentsListActionType } from './types';

export const updateCommentsList = (comments: CommentType[]) => {
  const action: UpdateCommentsListActionType = {
    type: actionTypes.GET_COMMENTS,
    payload: comments,
  };

  return action;
};

export const deleteComment = (id: string) => {
  const action: UpdateCommentsListActionType = {
    type: actionTypes.DELETE_COMMENT,
    payload: id,
  };

  return action;
};