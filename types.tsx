/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
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

export type ProfileType = {
  id: string,
  first_name: string,
  last_name: string,
  caption?: string,
  profile_picture?: UserFileType,
  user: UserType,
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
  profile: ProfileType,
  likes?: number,
  images: UserFileType[],
}