import { ProfileType, UserFileType } from '../../types';
import * as actionTypes from './actionTypes';
import { UserDetailsActionType } from './types';

export const updateUserDetails = (userDetails: ProfileType<UserFileType>) => {
  const action: UserDetailsActionType = {
    type: actionTypes.UPDATE_USER_DETAILS,
    payload: userDetails,
  };

  return action;
};

export const updateOtherProfileDetails = (profileDetails: ProfileType<UserFileType> | null) => {
  const action: UserDetailsActionType = {
    type: actionTypes.UPDATE_OTHER_PROFILE_DETAILS,
    payload: profileDetails,
  };

  return action;
};

