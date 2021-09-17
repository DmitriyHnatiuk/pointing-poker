import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setUserDataActionCreation } from 'redux/reducer/userReducer';
import { RootState } from 'redux/store';
import { URL } from 'constants/API';

import GameStatus from './GameStatus';
import Issues from './Issues';
import Members from './Members';
import AdminMenu from './AdminMenu';

import styles from './index.module.scss';

const socket = io(URL, { autoConnect: false });

const AdminLobby: React.FC = (): JSX.Element => {
	const history = useHistory();
	const user = useSelector<RootState>((state) => state.userReducer);
	const dispatch = useDispatch();

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

		socket.on('event://your room name', (roomName) => {
			console.log(roomName);
			const obj = { roomNumber: roomName };
			return dispatch(setUserDataActionCreation(obj));
		});

		socket.on('event://message', (ms, obj) => {
			socket.emit('clientMessage', 'socketConnect');
			console.log(ms, obj);
		});
	}, []);

	socket.on('event://error', (err) => {
		console.log(err);
		history.push('/');
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
