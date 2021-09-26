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
export const ADMIN = 'ADMIN';
export const AGREE = 'AGREE';
export const DELETE = 'DELETE';
export const SUBSCRIBE = 'SUBSCRIBE';
export const UNSUBSCRIBE = 'UNSUBSCRIBE';
export const SEND_MESSAGE = 'SEND_MESSAGE';

const socket = io(ENDPOINT, { autoConnect: false });
const { HOME } = ways;

type dispatchTypes = ThunkDispatch<
	RootState,
	never,
	ActionType | modalActionType
>;

const socketCreator =
	(data: dataTypes) =>
	(dispatch: dispatchTypes): void => {
		const { usersData, type, message, id } = data;

		const setExit = () => {
			socket.offAny();
			socket.disconnect();
			history.push(HOME);
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

			socket.on('event://your_data', (userData) =>
				dispatch(setUserDataActionCreation(userData))
			);

			socket.on('event://your_room_data', (rooms) => {
				if (!rooms) {
					return setExit();
				}

				return dispatch(setUserDataActionCreation({ users: rooms.users }));
			});

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
					if (event === ADMIN) {
						return console.log(
							messages,
							userToDelete.firstName,
							userToDelete.lastName
						);
					}
					return null;
				}
			);

			socket.on('event://error', (error) => {
				console.log(error);
				return setExit();
			});
		}
		// delete users
		if (type === DELETE) {
			socket.emit('event://delete', id);
		}
		// agree
		if (type === AGREE) {
			socket.emit('event://agree_delete', id);
		}

		// #chat parts
		if (type === CHAT) {
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
