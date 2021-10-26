import * as actionTypes from './actionTypes';
import { UserDetailsActionType, UserDetailsStateType } from './types';

const initialState: UserDetailsStateType = {
  user: null,
  otherProfileUsername: null,
  otherProfile: null,
};

const reducer = (
  state: UserDetailsStateType = initialState,
  action: UserDetailsActionType
): UserDetailsStateType => {
  switch (action.type) {
    case actionTypes.UPDATE_USER_DETAILS:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.UPDATE_OTHER_PROFILE_DETAILS:
      return {
        ...state,
        otherProfile: action.payload,
      };
    case actionTypes.UPDATE_OTHER_PROFILE_USERNAME:
      return {
        ...state,
        otherProfileUsername: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
