import React, { useMemo } from 'react';

import { useTypedSelector } from 'hooks/useTypedSelector';
import { getMembers } from 'redux/reducer/selectors';
import { User } from 'redux/reducer/userReducer/types';

import PlayerCard from 'components/common/UserCard';

import styles from './index.module.scss';

const Members: React.FC = (): JSX.Element => {
	const { users } = useTypedSelector<User>(getMembers);

	const isUsers = useMemo(() => {
		return users.filter((user) => user.isAdmin === false);
	}, [users]);

	return (
		<div className={styles.membersWrapper}>
			<h2>Members</h2>
			<div id="members" className={styles.membersContent}>
				{isUsers.length > 0 ? (
					isUsers.map((user) => <PlayerCard user={user} key={user.id} />)
				) : (
					<h4>Waiting for team members...</h4>
				)}
			</div>
		</div>
	);
};

export default Members;
