// import { MessageType, ProfileType, UserFileType } from '../../types';
// import * as actionTypes from './actionTypes';
// import {
//   ActiveChatActionType,
//   ActiveChatUserActionType,
//   DispatchActiveChatType,
//   DispatchActiveChatUserType,
// } from './types';

// // Active chat
// export const updateActiveChat = (message: MessageType) => {
//   const action: ActiveChatActionType = {
//     type: actionTypes.ACTIVE_CHAT,
//     payload: message,
//   };

//   return getActiveChat(action);
// };

// export const getActiveChat = (action: ActiveChatActionType) => {
//   return (dispatch: DispatchActiveChatType) => {
//     // Request api then dispatch the results

//     dispatch(action);
//   };
// };

// // Active chat user
// export const updateActiveChatUser = (profile: ProfileType<UserFileType> | null) => {
//   const action: ActiveChatUserActionType = {
//     type: actionTypes.ACTIVE_CHAT_USER,
//     payload: profile,
//   };

//   return getActiveChatUser(action);
// };

// export const getActiveChatUser = (action: ActiveChatUserActionType) => {
//   return (dispatch: DispatchActiveChatUserType) => {
//     // Request api then dispatch the results

//     dispatch(action);
//   };
// };



import { MessageType, ProfileType, UserFileType } from '../../types';
import * as actionTypes from './actionTypes';
import {
  ActiveChatActionType,
  ActiveChatUserActionType,
} from './types';

// Active chat
export const updateActiveChat = (message: MessageType) => {
  const action: ActiveChatActionType = {
    type: actionTypes.ACTIVE_CHAT,
    payload: message,
  };

  return action;
};

// Active chat user
export const updateActiveChatUser = (profile: ProfileType<UserFileType> | null) => {
  const action: ActiveChatUserActionType = {
    type: actionTypes.ACTIVE_CHAT_USER,
    payload: profile,
  };

  return action;
};
