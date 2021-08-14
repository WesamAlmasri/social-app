import { UserType } from '../../types';

export type UserDetailsStateType = {
  user: UserType | null;
};

export type UserDetailsActionType = {
  type: string;
  payload: UserType;
};

export type DispatchType = (args: UserDetailsActionType) => UserDetailsActionType