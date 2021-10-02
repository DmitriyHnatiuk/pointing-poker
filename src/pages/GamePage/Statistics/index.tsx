import React from 'react';

import PlayingCardComponent from 'components/common/PlayingCard';
import { Game } from 'redux/reducer/gameSettingReducer/types';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { getGame } from 'redux/reducer/selectors';

import styles from './index.module.scss';

const Statistics: React.FC = (): JSX.Element => {
	const { cards, scoreType } = useTypedSelector<Game>(getGame);
	const count = '20%';

	return (
		<div className={styles.statistics}>
			<h3>Statistics:</h3>
			<ul className={styles.cards}>
				{cards.map((card) => (
					<li key={card.id} className={styles.card}>
						<PlayingCardComponent
							card={card}
							scoreType={scoreType}
							inStatistics
						/>
						<span>{count}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Statistics;
