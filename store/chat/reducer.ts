import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';
import {
  ActiveChatActionType,
  ActiveChatStateType,
  ActiveChatUserActionType,
  ActiveChatUserStateType,
} from './types';

const activeChatInitialState: ActiveChatStateType = {
  activeChat: null,
};

const activeChatUserInitialState: ActiveChatUserStateType = {
  activeChatUser: null,
};

const activeChatReducer = (
  state: ActiveChatStateType = activeChatInitialState,
  action: ActiveChatActionType
): ActiveChatStateType => {
  switch (action.type) {
    case actionTypes.ACTIVE_CHAT:
      return {
        ...state,
        activeChat: action.payload,
      };
    default:
      return state;
  }
};

const activeChatUserReducer = (
  state: ActiveChatUserStateType = activeChatUserInitialState,
  action: ActiveChatUserActionType
): ActiveChatUserStateType => {
  switch (action.type) {
    case actionTypes.ACTIVE_CHAT_USER:
      return {
        ...state,
        activeChatUser: action.payload,
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  activeChat: activeChatReducer,
  activeChatUser: activeChatUserReducer,
});

export default reducer;
