import { useTypedSelector } from 'src/hooks/useTypedSelector';

import { selectUsersVoteCards } from '_redux/reducer/usersVote/selectors';

import PlayingCard from 'src/components/common/PlayingCard';
import { getInterest } from 'src/utils/getPlayingCards';

import styles from './index.module.scss';

const Statistics = () => {
	const { data, list } = useTypedSelector(selectUsersVoteCards);

	return !list.length ? null : (
		<div className={styles.statistics}>
			<h3>Statistics:</h3>
			<ul className={styles.list}>
				{list.map((key) => (
					<li key={key}>
						<PlayingCard score={data[key].score} cardId={key} inStatistics />
						<span className="text">
							{getInterest({
								count: data[key].count,
								length: list.length
							})}
							%
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Statistics;
