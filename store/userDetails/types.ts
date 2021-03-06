import { ProfileType, UserFileType } from '../../types';

export type UserDetailsStateType = {
  user: ProfileType<UserFileType> | null;
  otherProfileUsername: ProfileType<UserFileType> | null;
  otherProfile: ProfileType<UserFileType> | null;
};

export type UserDetailsActionType = {
  type: string;
  payload: ProfileType<UserFileType> | null;
};

export type DispatchType = (args: UserDetailsActionType) => UserDetailsActionType