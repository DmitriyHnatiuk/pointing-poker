import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { logoutAction } from '../loading/logoutAction';
import { ModalType, NotificationType } from './types';

const initialState: ModalType = {
	kickModalData: [],
	connectModalData: [],
	notifications: []
};

type StateType = typeof initialState;

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		addToKickModal: (
			state: StateType,
			action: PayloadAction<{ id: string; playerKick: string; player: string }>
		) => {
			state.kickModalData.push(action.payload);
		},
		resetKickModal: (state: StateType) => {
			state.kickModalData = [];
		},

		setUserConnectModal: (
			state: StateType,
			action: PayloadAction<{ id: string; player: string }>
		) => {
			state.connectModalData.push({
				id: action.payload.id,
				player: action.payload.player
			});
		},

		removeUserConnectModal: (
			state: StateType,
			action: PayloadAction<string>
		) => {
			state.connectModalData = state.connectModalData.filter(
				(connection) => connection.id !== action.payload
			);
		},

		addNotifications: (
			state: StateType,
			action: PayloadAction<NotificationType>
		) => {
			state.notifications.push(action.payload);
		},

		removeNotification: (state: StateType, action: PayloadAction<string>) => {
			state.notifications = state.notifications.filter(
				(notifications) => notifications.id !== action.payload
			);
		},
		removeAllNotifications: (state: StateType) => {
			state.notifications = [];
		}
	},
	extraReducers: (builder) => {
		builder.addCase(logoutAction, () => initialState);
	}
});

export const {
	addToKickModal,
	resetKickModal,
	setUserConnectModal,
	removeUserConnectModal,
	addNotifications,
	removeNotification,
	removeAllNotifications
} = modalSlice.actions;

export default modalSlice.reducer;
