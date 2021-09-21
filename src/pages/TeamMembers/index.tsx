import React, { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTypedSelector } from 'hooks/useTypedSelector';

import { getMembers } from 'redux/reducer/selectors';
import { User } from 'redux/reducer/userReducer/types';
import { setUserDataActionCreation } from 'redux/reducer/userReducer';

import { URL } from 'constants/API';
import { ways } from 'constants/constRouter';

import PlayerCard from 'components/common/UserCard';
import MyButton from 'components/common/MyButton';

import styles from './index.module.scss';

const { HOME } = ways;
const socket = io(URL, { autoConnect: false });

const TeamMembers: React.FC = () => {
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
				return history.push(HOME);
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

	const { users } = useTypedSelector<User>(getMembers);

	const admin = useMemo(() => {
		return users.find((user) => user.isAdmin === true);
	}, [users]);

	const isUsers = useMemo(() => {
		return users.filter((user) => user.isAdmin === false);
	}, [users]);

	return (
		<section className={styles.section}>
			<h3>Spring planning:</h3>
			<div className={styles.scram}>
				<span>Scram master:</span>
				{admin && <PlayerCard user={admin} />}
			</div>
			<div className={styles.exit}>
				<MyButton value="Exit" onclick={setExit} />
			</div>
			<div className={styles.team}>
				<h3>Members:</h3>
				<div className={styles.members}>
					{isUsers.length !== 0 ? (
						isUsers.map((user) => <PlayerCard user={user} key={user.id} />)
					) : (
						<h4>Waiting for team members...</h4>
					)}
				</div>
			</div>
		</section>
	);
};

export default TeamMembers;
