import React, { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useTypedSelector } from 'hooks/useTypedSelector';
import { getMembers } from 'redux/reducer/selectors';
import { Profile, User } from 'redux/reducer/userReducer/types';
import { setUserDataActionCreation } from 'redux/reducer/userReducer';
import { URL } from 'constants/API';

import PlayerCard from 'components/common/PlayerCard';
import MyButton from 'components/common/MyButton';

import styles from './index.module.scss';

const socket = io(URL, { autoConnect: false });

const TeamMembers: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const userData = useTypedSelector<User>(getMembers);

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
	}, []);

	// test
	socket.on('event://your room members', (members: Profile) => {
		if (!members) {
			return history.push('/');
		}
		const obj = { users: members.users };

		return dispatch(setUserDataActionCreation(obj));
	});

	socket.on('event://your room data', (rooms) => {
		if (!rooms) {
			return history.push('/');
		}
		const obj = { users: rooms.users };

		return dispatch(setUserDataActionCreation(obj));
	});

	socket.on('event://message', (ms, obj) => {
		console.log(ms, obj);
	});

	socket.on('event://error', (err) => {
		console.log(err);
		history.push('/');
	});

	const { users } = useTypedSelector<User>(getMembers);

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
