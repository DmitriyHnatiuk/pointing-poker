import React from 'react';

import { useTypedSelector } from 'hooks/useTypedSelector';

import ScoreCard from 'components/common/ScoreCard';
import PlayerCard from 'components/common/UserCard';

import { getMembers } from 'redux/reducer/selectors';
import { User } from 'redux/reducer/userReducer/types';

import styles from './index.module.scss';

const UsersScore: React.FC = (): JSX.Element => {
	const { users } = useTypedSelector<User>(getMembers);
	const players = users.filter((user) => !user.observer);
	const observer = users.filter((user) => user.observer);
	const renderObserver = observer.length > 0;

	return (
		<div className={styles.users}>
			<div className={styles.title}>
				<h2>Score:</h2>
				<h2>Players:</h2>
			</div>
			<ul className={styles.scoreList}>
				{players.map((member) => (
					<li className={styles.memberScore} key={member.id}>
						<ScoreCard selectedCard={member.selectedCard} />
						<PlayerCard user={member} style={styles.userCard} />
					</li>
				))}
			</ul>
			{renderObserver && (
				<ul className={styles.observer}>
					<h2>Observers:</h2>
					{observer.map((member) => (
						<li className={styles.memberScore} key={member.id}>
							<PlayerCard user={member} style={styles.userCard} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default UsersScore;
