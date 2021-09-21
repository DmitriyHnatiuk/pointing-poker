import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTypedSelector } from 'hooks/useTypedSelector';

import { getMembers } from 'redux/reducer/selectors';
import { User } from 'redux/reducer/userReducer/types';
import { setUserDataActionCreation } from 'redux/reducer/userReducer';

import { ways } from 'constants/constRouter';
import { URL } from 'constants/API';

import Members from './Members';
import GameStatus from './GameStatus';
import Issues from './Issues';
import AdminMenu from './AdminMenu';

import styles from './index.module.scss';

const socket = io(URL, { autoConnect: false });
const { HOME } = ways;

const AdminLobby: React.FC = (): JSX.Element => {
	const history = useHistory();
	const dispatch = useDispatch();
	const userData = useTypedSelector<User>(getMembers);

	const setExit = () => {
		socket.offAny();
		history.push(HOME);
	};

	useEffect(() => {
		socket.connect();
		socket.emit(
			'event://connect_to_room',
			userData,
			(res: { status: string }) => {
				const response = res.status === 'ok' ? console.log('done') : setExit();

				return response;
			}
		);
		socket.onAny((event, ...args) => {
			console.log(event, args);
		});

		socket.on('event://your_data', (data) => {
			return dispatch(setUserDataActionCreation(data));
		});

		socket.on('event://your_room_data', (rooms) => {
			if (!rooms) {
				setExit();
				return null;
			}

			return dispatch(setUserDataActionCreation({ users: rooms.users }));
		});

		// socket.on('event://message', (ms, obj) => {
		// 	console.log(ms, obj);
		// });

		socket.on('event://error', (error) => {
			console.log(error);
			setExit();
		});
	}, []);

	return (
		<div className={styles.adminLobby}>
			<GameStatus />
			<Members />
			<Issues />
			<AdminMenu />
		</div>
	);
};

export default AdminLobby;
