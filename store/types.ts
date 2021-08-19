import { UserDetailsStateType } from './userDetails/types';
import { ActiveNotificationStateType } from './notifications/types';
import { ActiveChatStateType, ActiveChatUserStateType } from './chat/types';

export type StoreStateType = {
  user: UserDetailsStateType,
  notifications: ActiveNotificationStateType,
  chat: {
    activeChat: ActiveChatStateType,
    activeChatUser: ActiveChatUserStateType,
  },
};
