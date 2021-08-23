import { UserType } from '../../types';

export type UserDetailsStateType = {
  user: UserType | null;
};

export type UserDetailsActionType = {
  type: string;
  payload: UserType | null;
};

export type DispatchType = (args: UserDetailsActionType) => UserDetailsActionType