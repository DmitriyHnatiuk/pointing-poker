import PlayerCard from 'components/common/PlayerCard';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React, { useMemo } from 'react';
import { getMembers } from 'redux/reducer/selectors';
import { User } from 'redux/reducer/userReducer/types';

import styles from './index.module.scss';

const Members: React.FC = (): JSX.Element => {
	const { users } = useTypedSelector<User>(getMembers);

	const isUsers = useMemo(() => {
		return users.filter((user) => user.isAdmin === false);
	}, [users]);

	const renderMembers = () =>
		isUsers.length > 0 ? (
			isUsers.map((user) => {
				return <PlayerCard user={user} key={user.id} />;
			})
		) : (
			<h4>Waiting for team members...</h4>
		);

	return (
		<div className={styles.membersWrapper}>
			<h2>Members</h2>
			<div id="members" className={styles.membersContent}>
				{renderMembers()}
			</div>
		</div>
	);
};

export default Members;
