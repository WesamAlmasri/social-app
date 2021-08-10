import { UserType } from '../../types';
import * as actionTypes from './actionTypes';
import { DispatchType, UserDetailsActionType } from './types';

export const updateUserDetails = (userDetails: UserType) => {
  const action: UserDetailsActionType = {
    type: actionTypes.UPDATE_USER_DETAILS,
    payload: userDetails,
  };

  return;
};

export const getUserDetails = (action: UserDetailsActionType) => {
  return (dispatch: DispatchType) => {
    // Request api then dispatch the results

    dispatch(action);
  };
};
