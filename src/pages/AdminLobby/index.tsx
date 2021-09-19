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

import GameStatus from './GameStatus';
import Issues from './Issues';
import Members from './Members';
import AdminMenu from './AdminMenu';

import styles from './index.module.scss';

const socket = io(URL, { autoConnect: false });
const { HOME } = ways;

const AdminLobby: React.FC = (): JSX.Element => {
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useTypedSelector<User>(getMembers);

	useEffect(() => {
		socket.connect();
		socket.emit(
			'event://user connect without members data',
			user,
			(res: { status: string }) => {
				const response = res.status
					? console.log('done')
					: console.log('error');

				return response;
			}
		);
	}, []);

	socket.on('event://your room name', (roomName) => {
		const obj = { roomNumber: roomName };

		return dispatch(setUserDataActionCreation(obj));
	});

	socket.on('event://message', (ms, obj) => {
		console.log(ms, obj);
	});

	socket.on('event://your room data', (rooms) => {
		if (!rooms) {
			return history.push(HOME);
		}
		const obj = { users: rooms.users };

		return dispatch(setUserDataActionCreation(obj));
	});

	socket.on('event://error', (err) => {
		console.log(err);
		history.push(HOME);
	});

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
