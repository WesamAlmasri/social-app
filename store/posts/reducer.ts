import * as actionTypes from './actionTypes';
import { UpdatePostsListActionType, PostsStateType } from './types';

const initialState: PostsStateType = {
  posts: [],
};

const reducer = (
  state: PostsStateType = initialState,
  action: UpdatePostsListActionType
): PostsStateType => {
  switch (action.type) {
    case actionTypes.GET_POSTS:
      if(Array.isArray(action.payload)){
        return {
          ...state,
          posts: action.payload,
        };
      } else {
        return state;
      }
    case actionTypes.DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter(post => post.id !== action.payload)
        }
    default:
      return state;
  }
};

export default reducer;
