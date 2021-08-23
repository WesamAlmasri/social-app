import { NotificationType } from '../../types';

export type ActiveNotificationStateType = {
  activeNotification: NotificationType | null;
};

export type ActiveNotificationActionType = {
  type: string;
  payload: NotificationType;
};

export type DispatchType = (args: ActiveNotificationActionType) => ActiveNotificationActionType