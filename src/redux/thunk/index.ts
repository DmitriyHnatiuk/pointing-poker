import { io } from 'socket.io-client';

import {
	routerActionType,
	setRouterDataActionCreation
} from 'redux/reducer/routerReducer';
import { RootState } from 'redux/store';
import {
	ActionType,
	resetUserDataActionCreation,
	setUserDataActionCreation
} from 'redux/reducer/userReducer';

import { ENDPOINT } from 'constants/API';
import { ThunkDispatch } from 'redux-thunk';
import { dataTypes } from 'interfaces/thunk';
import { ways } from 'constants/constRouter';

export const CHAT = 'CHAT';
export const SUBSCRIBE = 'SUBSCRIBE';
export const UNSUBSCRIBE = 'UNSUBSCRIBE';
export const SEND_MESSAGE = 'SEND_MESSAGE';

const socket = io(ENDPOINT, { autoConnect: false });
const { HOME } = ways;

type dispatchTypes = ThunkDispatch<
	RootState,
	never,
	ActionType | routerActionType
>;

const socketCreator =
	(data: dataTypes) =>
	(dispatch: dispatchTypes): void => {
		const { usersData, type, message } = data;

		const setExit = () => {
			socket.offAny();
			socket.disconnect();
			return dispatch(setRouterDataActionCreation(HOME));
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

			socket.on('event://error', (error) => {
				console.log(error);
				return setExit();
			});
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
