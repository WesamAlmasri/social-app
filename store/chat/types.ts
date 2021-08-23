import { MessageType, ProfileType, UserFileType } from '../../types';

export type ActiveChatStateType = {
  activeChat: MessageType | null;
};

export type ActiveChatActionType = {
  type: string;
  payload: MessageType;
};

export type ActiveChatUserStateType = {
  activeChatUser: ProfileType<UserFileType> | null;
};

export type ActiveChatUserActionType = {
  type: string;
  payload: ProfileType<UserFileType>;
};

export type DispatchActiveChatType = (
  args: ActiveChatActionType | ActiveChatUserActionType
) => ActiveChatActionType | ActiveChatUserActionType;
export type DispatchActiveChatUserType = (
  args: ActiveChatUserActionType
) => ActiveChatUserActionType;
