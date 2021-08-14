import { NotificationType } from '../../types';
import * as actionTypes from './actionTypes';
import { DispatchType, ActiveNotificationActionType } from './types';

export const updateActiveNotification = (notification: NotificationType) => {
  const action: ActiveNotificationActionType = {
    type: actionTypes.UPDATE_ACTIVE_NOTIFICATION,
    payload: notification,
  };

  return getActiveNotification(action);
};

export const getActiveNotification = (action: ActiveNotificationActionType) => {
  return (dispatch: DispatchType) => {
    // Request api then dispatch the results

    dispatch(action);
  };
};
