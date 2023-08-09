import { RootState } from '../../store';
import {
	ConnectModalDataType,
	KickModalDataType,
	NotificationType
} from './types';

export const selectConnectModalData = (
	state: RootState
): ConnectModalDataType[] => state.modal.connectModalData;

export const selectKickModalData = (state: RootState): KickModalDataType[] =>
	state.modal.kickModalData;

export const selectNotifications = (state: RootState): NotificationType[] =>
	state.modal.notifications;
