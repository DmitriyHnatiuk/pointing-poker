import { ThunkDispatch } from 'redux-thunk';
import { io } from 'socket.io-client';
import history from 'utils/history';

import { RootState } from 'redux/store';
import {
	ActionType,
	resetUserDataActionCreation,
	setUserDataActionCreation
} from 'redux/reducer/userReducer';
import {
	modalActionType,
	setModalDataActionCreation
} from 'redux/reducer/modalReducer';
import { chatActionType, pushMessage } from 'redux/reducer/chatReducer';
import {
	deleteIssue,
	resetGameData,
	setGameData
} from 'redux/reducer/gameSettingReducer';
import { GameAction } from 'redux/reducer/gameSettingReducer/types';

import { ENDPOINT } from 'constants/API';
import { ways } from 'constants/constRouter';
import { dataTypes } from 'interfaces/thunk';
import { interfaceChatMessage } from 'interfaces/commonChat';

export const CHAT = 'CHAT';
export const KICK = 'KICK';
export const AGREE = 'AGREE';
export const ADMINS = 'ADMIN';
export const DELETE = 'DELETE';
export const MESSAGE = 'MESSAGE';
export const ADD_ISSUE = 'ADD_ISSUE';
export const SUBSCRIBE = 'SUBSCRIBE';
export const SET_START = 'SET_START';
export const RESET_GAME = 'RESET_GAME';
export const UNSUBSCRIBE = 'UNSUBSCRIBE';
export const ADMIN_AGREE = 'ADMIN_AGREE';
export const SELECT_CARD = 'SELECT_CARD';
export const USER_CONNECT = 'USER_CONNECT';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const ADMIN_RUN_ROUND = 'RUN_ROUND';
export const SELECT_ISSUE = 'SELECT_ISSUE';
export const DELETE_ISSUE = 'DELETE_ISSUE';
export const ADMIN_DISAGREE = 'ADMIN_DISAGREE';

const socket = io(ENDPOINT, { autoConnect: false });
const { HOME, ADMIN, USER, GAME } = ways;

const toLobby = (isAdmin: boolean | undefined) => {
	const path = isAdmin ? ADMIN : USER;
	return history.push(path);
};

type dispatchTypes = ThunkDispatch<
	RootState,
	never,
	ActionType | modalActionType | chatActionType | GameAction
>;

const socketCreator =
	(data: dataTypes) =>
	(dispatch: dispatchTypes, getState: () => RootState): void => {
		const { usersData, type, message, id, gameSettings, issue } = data;

		const setExit = () => {
			dispatch(resetUserDataActionCreation());
			dispatch(resetGameData());
			socket.offAny();
			socket.disconnect();
			history.push(HOME);
		};

		socket.connect();

		if (type === SUBSCRIBE) {
			dispatch(setUserDataActionCreation({ loading: true }));
			socket.emit(
				'event://connect_to_room',
				usersData,
				(res: { status: string }) =>
					res.status === 'ok'
						? dispatch(setUserDataActionCreation({ loading: false }))
						: setExit()
			);

			socket.onAny((event, ...args) => console.log(event, args));

			socket.on('event://your_data', (userData) => {
				const admin = usersData?.isAdmin;
				dispatch(setUserDataActionCreation(userData));
				if (userData.firstName) {
					toLobby(admin);
				}
			});

			socket.on('event://your_room_data', (users) => {
				if (!users) {
					return setExit();
				}
				return dispatch(setUserDataActionCreation({ users }));
			});

			socket.on('event://your_game_data', (gameData) => {
				if (!gameData) {
					return setExit();
				}
				dispatch(setGameData(gameData));
				dispatch(setUserDataActionCreation({ login: true }));
				return history.push(GAME);
			});

			if (usersData?.isAdmin) {
				socket.on('event://User_connect', (user) => {
					const player = `${user.firstName} ${user.lastName}`;
					return dispatch(
						setModalDataActionCreation({
							openModal: true,
							type: USER_CONNECT,
							player,
							id: user.id
						})
					);
				});
			} else {
				socket.on('event://admin_confirm_connect', () =>
					socket.emit('event://connect_user')
				);
			}
			socket.on('event://time_now', (userId) => {
				const state = getState();
				const { timer } = state.gameSettings;
				socket.emit('event://time', timer, userId);
			});

			socket.on(
				'event://server_message',
				({ event, user, userToDelete, messages }) => {
					if (event === DELETE) {
						const player = `${user.firstName}  ${user.lastName}`;
						const playerKick = `${userToDelete.firstName} ${userToDelete.lastName}`;
						return dispatch(
							setModalDataActionCreation({
								openModal: true,
								type: KICK,
								player,
								playerKick,
								id: userToDelete.id
							})
						);
					}
					if (event === ADMINS) {
						return dispatch(
							setModalDataActionCreation({
								openModal: true,
								type: MESSAGE,
								message: messages,
								error: false
							})
						);
					}
					return null;
				}
			);

			socket.on('event://error', (error, errorType = true) => {
				setExit();
				return dispatch(
					setModalDataActionCreation({
						openModal: true,
						type: MESSAGE,
						message: error,
						error: errorType
					})
				);
			});
		}
		// admin agree connect user
		if (type === ADMIN_AGREE) {
			socket.emit('event://confirm_connect', id);
		}
		if (type === ADMIN_DISAGREE) {
			socket.emit('event://cancel_connect', id);
		}

		// delete users
		if (type === DELETE) {
			socket.emit('event://delete', id);
		}
		// agree
		if (type === AGREE) {
			socket.emit('event://agree_delete', id);
		}
		if (type === ADD_ISSUE) {
			socket.emit('event://admin_add_issue', issue);
		}
		if (type === SELECT_ISSUE) {
			socket.emit('event://admin_select_issue', gameSettings?.issues);
		}
		if (type === DELETE_ISSUE) {
			if (history.location.pathname === GAME) {
				socket.emit('event://admin_delete_issue', issue?.id);
			}
			if (history.location.pathname === ADMIN) {
				if (issue) {
					dispatch(deleteIssue({ id: issue.id }));
				}
			}
		}
		if (type === SET_START) {
			socket.emit('event://admin_start_game', gameSettings);
		}

		if (type === ADMIN_RUN_ROUND) {
			socket.emit('event://admin_run_round', gameSettings);
		}

		if (type === RESET_GAME) {
			socket.emit('event://admin_reset_round', gameSettings);
		}
		if (type === SELECT_CARD) {
			socket.emit('event://select_card', id);
		}

		if (type === CHAT) {
			socket.on('event://message_from_user', (ms: interfaceChatMessage) => {
				if (!ms) return;
				dispatch(pushMessage(ms));
			});
			socket.on('event://message_from_admin', (ms: interfaceChatMessage) => {
				if (!ms) return;
				dispatch(pushMessage(ms));
			});
		}

		if (type === SEND_MESSAGE) {
			socket.emit('event://message', message);
		}

		if (type === UNSUBSCRIBE) {
			setExit();
		}
	};

export default socketCreator;
