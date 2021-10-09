import { CommentType } from '../../types';
import * as actionTypes from './actionTypes';
import { CommentsStateType, UpdateCommentsListActionType, DispatchType } from './types';

const initialState: CommentsStateType = {
  comments: [],
};

const reducer = (
  state: CommentsStateType = initialState,
  action: UpdateCommentsListActionType
): CommentsStateType => {
  switch (action.type) {
    case actionTypes.GET_COMMENTS:

    if (Array.isArray(action.payload)) {
        return {
          ...state,
          comments: action.payload,
        };
      } else {
        return state;
      }
    case actionTypes.DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
