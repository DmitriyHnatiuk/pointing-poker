import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from 'hooks/useTypedSelector';

import socketCreator, { UNSUBSCRIBE } from 'redux/thunk';
import { getMembers, getModal } from 'redux/reducer/selectors';
import { User } from 'redux/reducer/userReducer/types';
import { Modal } from 'redux/reducer/modalReducer/types';

import { btnValue } from 'constants/commonComponents';

import PlayerCard from 'components/common/UserCard';
import MyButton from 'components/common/MyButton';
import Modals from 'components/common/Modals';

import styles from './index.module.scss';

const TeamMembers: React.FC = () => {
	const dispatch = useDispatch();

	const { users } = useTypedSelector<User>(getMembers);
	const { openModal } = useTypedSelector<Modal>(getModal);

	const setExit = () => dispatch(socketCreator({ type: UNSUBSCRIBE }));

	const admin = useMemo(() => {
		return users.find((user) => user.isAdmin === true);
	}, [users]);

	const isUsers = useMemo(() => {
		return users.filter((user) => user.isAdmin === false);
	}, [users]);

	return (
		<>
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
				{openModal && <Modals />}
			</section>
		</>
	);
};

export default TeamMembers;
