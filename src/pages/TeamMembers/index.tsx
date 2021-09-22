import React, { useMemo } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from 'hooks/useTypedSelector';

import socketCreator, { UNSUBSCRIBE } from 'redux/thunk';
import { getMembers, getPath } from 'redux/reducer/selectors';
import { User } from 'redux/reducer/userReducer/types';
import { Rout } from 'redux/reducer/routerReducer/types';

import { ways } from 'constants/constRouter';
import { btnValue } from 'constants/commonComponents';

import PlayerCard from 'components/common/UserCard';
import MyButton from 'components/common/MyButton';

import styles from './index.module.scss';

const { HOME } = ways;

const TeamMembers: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const setExit = () => {
		dispatch(socketCreator({ type: UNSUBSCRIBE }));
		history.push(HOME);
	};

	const { path } = useTypedSelector<Rout>(getPath);
	const { users } = useTypedSelector<User>(getMembers);

	const admin = useMemo(() => {
		return users.find((user) => user.isAdmin === true);
	}, [users]);

	const isUsers = useMemo(() => {
		return users.filter((user) => user.isAdmin === false);
	}, [users]);

	return (
		<>
			{path && <Redirect to={path} />}
			<section className={styles.section}>
				<h3>Spring planning:</h3>
				<div className={styles.scram}>
					<span>Scram master:</span>
					{admin && <PlayerCard user={admin} />}
				</div>
				<div className={styles.exit}>
					<MyButton value={btnValue.EXIT} onclick={setExit} />
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
		</>
	);
};

export default TeamMembers;
