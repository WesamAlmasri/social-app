/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NewPost: undefined;
  SinglePost: undefined;
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

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

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