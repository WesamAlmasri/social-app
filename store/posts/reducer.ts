import { PostType } from '../../types';
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

    if (Array.isArray(action.payload)) {
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
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case actionTypes.UPDATE_POST:
      const newPostList: PostType[] = state.posts.map(post => {
        if(post.id === action.payload){
          return {
            ...post,
              am_like: !post.am_like,
              likes: typeof(post.likes) === 'number' ? (post.am_like ? post.likes - 1 : post.likes + 1) : undefined
          }
        } else {
          return post;
        }
      });

      return {
        ...state,
        posts: newPostList,
      };
    default:
      return state;
  }
};

export default reducer;
