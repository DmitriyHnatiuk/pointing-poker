import React from 'react';

import { useTypedSelector } from 'hooks/useTypedSelector';

import ScoreCard from 'components/common/ScoreCard';
import PlayerCard from 'components/common/UserCard';

import { getMembers } from 'redux/reducer/selectors';
import { User } from 'redux/reducer/userReducer/types';

import styles from './index.module.scss';

const UsersScore: React.FC = (): JSX.Element => {
	const user = useTypedSelector<User>(getMembers);

	const player = user.users.filter((member) => !member.isAdmin);

	return (
		<div className={styles.users}>
			<div className={styles.title}>
				<h2>Score:</h2>
				<h2>Players:</h2>
			</div>
			<ul className={styles.scoreList}>
				{player.map((member) => (
					<li className={styles.memberScore} key={member.id}>
						<ScoreCard selectedCard={member.selectedCard} />
						<PlayerCard user={member} style={styles.userCard} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default UsersScore;
