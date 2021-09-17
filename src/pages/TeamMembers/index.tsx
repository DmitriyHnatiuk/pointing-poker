import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import { Profile } from 'redux/reducer/userReducer/types';
import { setUserDataActionCreation } from 'redux/reducer/userReducer';
import { RootState } from 'redux/store';
import { URL } from 'constants/API';

import PlayerCard from 'components/common/PlayerCard/PlayerCard';
import MyButton from 'components/common/MyButton/MyButton';

import { useHistory } from 'react-router-dom';

import styles from './index.module.scss';

const socket = io(URL, { autoConnect: false });

const TeamMembers: React.FC = () => {
	const history = useHistory();
	const userData = useSelector<RootState>((state) => state.userReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		socket.connect();

		socket.emit(
			'event://connect to room',
			userData,
			(res: { status: string }) => {
				const response = res.status
					? console.log('done')
					: console.log('error');
				return response;
			}
		);
		// test
		socket.on('event://your room members', (members: Profile) => {
			console.log(members);
			const obj = { users: members.users };

			console.log(obj, 'my members');
			return dispatch(setUserDataActionCreation(obj));
		});
		socket.on('event://your room data', (rooms) => {
			const obj = { users: rooms.users };
			console.log('resp', obj);
			dispatch(setUserDataActionCreation(obj));
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

	const { users } = useSelector((state: RootState) => state.userReducer);

	const admin = useMemo(() => {
		return users.find((user) => user.isAdmin === true);
	}, [users]);

	const isUsers = useMemo(() => {
		return users.filter((user) => user.isAdmin === false);
	}, [users]);

	const setExit = () => {
		return history.push('/');
	};

	const renderMembers = () => {
		return isUsers.length !== 0 ? (
			isUsers.map((user) => {
				return <PlayerCard user={user} key={user.id} />;
			})
		) : (
			<h4>Waiting for team members...</h4>
		);
	};

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
				<div className={styles.members}>{renderMembers()}</div>
			</div>
		</section>
	);
};

export default TeamMembers;
