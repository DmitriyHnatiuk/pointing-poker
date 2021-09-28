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
} from 'redux/reducer/modalReducer/index';

import { ENDPOINT } from 'constants/API';
import { ThunkDispatch } from 'redux-thunk';
import { dataTypes } from 'interfaces/thunk';
import { ways } from 'constants/constRouter';

export const CHAT = 'CHAT';
export const KICK = 'KICK';
export const AGREE = 'AGREE';
export const ADMINS = 'ADMIN';
export const DELETE = 'DELETE';
export const MESSAGE = 'MESSAGE';
export const SUBSCRIBE = 'SUBSCRIBE';
export const SET_START = 'SET_START';
export const UNSUBSCRIBE = 'UNSUBSCRIBE';
export const ADMIN_AGREE = 'ADMIN_AGREE';
export const USER_CONNECT = 'USER_CONNECT';
export const SEND_MESSAGE = 'SEND_MESSAGE';
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
	ActionType | modalActionType
>;

const socketCreator =
	(data: dataTypes) =>
	(dispatch: dispatchTypes): void => {
		const { usersData, type, message, id, gameSettings } = data;

		const setExit = () => {
			history.push(HOME);
			socket.offAny();
			socket.disconnect();
		};

		socket.connect();

		if (type === SUBSCRIBE) {
			socket.emit(
				'event://connect_to_room',
				usersData,
				(res: { status: string }) => {
					const response =
						res.status === 'ok' ? console.log('done') : setExit();

					return response;
				}
			);

			socket.onAny((event, ...args) => console.log(event, args));

			socket.on('event://your_data', (userData) => {
				const admin = usersData?.isAdmin;
				dispatch(setUserDataActionCreation(userData));
				toLobby(admin);
			});

			socket.on('event://your_room_data', (rooms) => {
				if (!rooms) {
					return setExit();
				}

				return dispatch(setUserDataActionCreation({ users: rooms.users }));
			});

			socket.on('event://your_game_data', (gameData, rooms) => {
				if (!gameData) {
					return setExit();
				}
				dispatch(setUserDataActionCreation({ login: true }));
				history.push(GAME);

				return console.log(gameData, rooms); // # dispatch gameData
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

			socket.on(
				'event://server_message',
				({ event, user, userToDelete, messages }) => {
					if (event === DELETE) {
						const player = `${user.firstName}  ${user.lastName}`;
						const playerKick = `${userToDelete.firstName} ${userToDelete.lastName}`;
						console.log(
							user.firstName,
							user.lastName,
							'wont delete',
							userToDelete.firstName,
							userToDelete.lastName
						);
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
						return console.log(
							messages,
							userToDelete.firstName,
							userToDelete.lastName
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

		if (type === SET_START) {
			socket.emit('event://admin_start_game', gameSettings);
		}

		if (type === CHAT) {
			// #chat parts
			socket.on('event://message_from_user', (ms) => console.log('user', ms));
			socket.on('event://message_from_admin', (ms) => console.log('admin', ms));
		}

		if (type === SEND_MESSAGE) {
			socket.emit('event://message', message);
		}

		if (type === UNSUBSCRIBE) {
			dispatch(resetUserDataActionCreation());
			setExit();
		}
	};

export default socketCreator;
