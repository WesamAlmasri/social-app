import { UserDetailsStateType } from './userDetails/types';
import { ActiveNotificationStateType } from './notifications/types';
import { ActiveChatStateType, ActiveChatUserStateType } from './chat/types';
import { PostsStateType } from './posts/types';

export type StoreStateType = {
  user: UserDetailsStateType,
  notifications: ActiveNotificationStateType,
  chat: {
    activeChat: ActiveChatStateType,
    activeChatUser: ActiveChatUserStateType,
  },
  posts: PostsStateType
};
