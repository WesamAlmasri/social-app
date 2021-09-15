import { UserType } from '../../types';
import * as actionTypes from './actionTypes';
import { UserDetailsActionType } from './types';

export const updateUserDetails = (userDetails: UserType | null) => {
  const action: UserDetailsActionType = {
    type: actionTypes.UPDATE_USER_DETAILS,
    payload: userDetails,
  };

  return action;
};

