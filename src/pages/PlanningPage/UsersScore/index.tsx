import { useTypedSelector } from 'src/hooks/useTypedSelector';

import ScoreCard from 'src/components/common/ScoreCard';
import PlayerCard from 'src/components/common/UserCard';

import {
	selectSortedUsers,
	selectUserData,
	selectUsersData
} from '_redux/reducer/userReducer/selectors';
import { selectUsersVote } from '_redux/reducer/usersVote/selectors';

import { useRef } from 'react';
import Button from 'src/components/common/Button';
import styles from './index.module.scss';

import PersonIcon from '_assets/images/CardPlayer/person.svg';
import { CloseIcon } from 'src/components/common/CloseIcon';

export const UsersScore = () => {
	const ref = useRef<HTMLDivElement>(null);

	const usersVote = useTypedSelector(selectUsersVote);
	const { isAdmin } = useTypedSelector(selectUserData);

	const { admin } = useTypedSelector(selectSortedUsers);
	const { players, observers } = useTypedSelector(selectUsersData);

	const handleClick = () => {
		if (ref.current) {
			ref.current.style.display = ref.current.scrollHeight ? 'none' : 'block';
		}
	};

	return (
		<>
			<Button
				onClick={handleClick}
				variant="outlined"
				style={`${styles.person_button} ${
					Object.keys(usersVote).length ? styles.point : ''
				}`}>
				<PersonIcon width="18" height="18" />
			</Button>

			<div className={styles.container} ref={ref}>
				<Button
					onClick={handleClick}
					variant="outlined"
					style={styles.close_button}>
					<CloseIcon />
				</Button>

				<ul className={styles.score_list}>
					<div className={styles.title}>
						<h2 className="title-4">Score:</h2>
						<h2 className="title-4">Players:</h2>
					</div>
					{admin && !admin.isObserver && !isAdmin && (
						<li>
							<ScoreCard selectedCard={usersVote[admin.id]?.score} />
							<PlayerCard {...admin} style={styles.user_card} />
						</li>
					)}
					{players.map((member) => (
						<li key={member.id}>
							<ScoreCard selectedCard={usersVote[member.id]?.score} />
							<PlayerCard {...member} style={styles.user_card} />
						</li>
					))}

					{Boolean(observers.length) && (
						<ul className={styles.observer}>
							<h2>Observers:</h2>
							{observers.map((observer) => (
								<li key={observer.id}>
									<PlayerCard
										{...observer}
										style={`${styles.user_card} ${styles.margin_auto}`}
									/>
								</li>
							))}
						</ul>
					)}
				</ul>
			</div>
		</>
	);
};
