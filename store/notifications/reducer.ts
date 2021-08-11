import * as actionTypes from './actionTypes';
import { ActiveNotificationActionType, ActiveNotificationStateType } from './types';

const initialState: ActiveNotificationStateType = {
  activeNotification: null,
};

const reducer = (
  state: ActiveNotificationStateType = initialState,
  action: ActiveNotificationActionType
): ActiveNotificationStateType => {
  switch (action.type) {
    case actionTypes.UPDATE_ACTIVE_NOTIFICATION:
      return {
        ...state,
        activeNotification: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
