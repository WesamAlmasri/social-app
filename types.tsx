/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  authController: undefined;
  socketService: undefined;
  VerificationCode: undefined;
  Login: undefined;
  Register: undefined;
  Main: undefined;
  MyProfile: {
    meProfile: boolean,
  };
  SingleProfile: undefined;
  SinglePost: undefined;
  Conversation: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Messages: undefined;
  Notifications: undefined;
  Profile: undefined;
  Search: undefined;
};

export type HomeNavigatorParamList = {
  HomeScreen: undefined;
  NewPostScreen: undefined;
  SinglePostScreen: undefined;
};

export type ProfileNavigatorParamList = {
  ProfileScreen: {
    profileName: string
  };
  EditProfileScreen: undefined;
};

export type SearchNavigatorParamList = {
  SearchScreen: undefined;
  ProfileScreen: undefined;
};

export type NotificationsNavigatorParamList = {
  NotificationsScreen: undefined;
}

export type MessagesNavigatorParamList = {
  MessagesScreen: undefined;
  ConversationScreen: undefined;
}

export type UserType = {
  id: string,
  username: string,
  email: string,
  last_login?: string | null,
  verified?: boolean,
  created_at?: string
}

export type UserFileType = {
  id: string,
  link: string,
}

export type ProfileType<ProfilePictureType> = {
  id: string,
  first_name: string,
  last_name: string,
  caption?: string,
  profile_picture?: ProfilePictureType,
  user?: UserType,
  followers?: number,
  followings?: number,
  am_follow?: boolean,
}

export type ProfileWithMessageType<ProfilePictureType> = {
  id: string,
  first_name: string,
  last_name: string,
  caption?: string,
  profile_picture?: ProfilePictureType,
  user?: UserType,
  followers?: number,
  followings?: number,
  am_follow?: boolean,
  last_message: MessageType,
}

export type MessageType = {
  id: string,
  sender_id: string,
  receiver_id: string,
  message: string,
  seen: boolean,
  created_at: string,
}

export type CategoryType = {
  id: string,
  name: string,
}

export type PostType = {
  id: string,
  text?: string,
  created_at: string,
  am_like: boolean,
  category: CategoryType,
  profile: ProfileType<UserFileType>,
  likes?: number,
  images: UserFileType[],
}

export type CommentType = {
  id: string,
  comment: string,
  created_at: string,
  post_owner: string,
  profile: ProfileType<string>,
}

export type NotificationType = {
  id: string,
  receiver_id: string,
  message: string,
  post_id: string,
  seen: boolean,
  created_at: string,
}