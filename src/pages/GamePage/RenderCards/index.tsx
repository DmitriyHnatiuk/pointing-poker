import React from 'react';

import PlayingCardComponent from 'components/common/PlayingCard';
import { Game } from 'redux/reducer/gameSettingReducer/types';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { getGame, getMembers } from 'redux/reducer/selectors';

import styles from './index.module.scss';

const RenderCards: React.FC<{ inStatistics?: boolean }> = ({
	inStatistics
}): JSX.Element => {
	const { cards, scoreType } = useTypedSelector<Game>(getGame);
	const { observer } = useTypedSelector(getMembers);

	let newCards = cards;

	if (inStatistics) {
		newCards = [...cards.filter((card) => card.count > 0)];
	}

	return (
		<ul className={styles.cards}>
			{newCards.map((card) => (
				<li key={card.id} className={styles.card}>
					{inStatistics ? (
						<PlayingCardComponent
							card={card}
							scoreType={scoreType}
							inStatistics
						/>
					) : (
						!observer && (
							<PlayingCardComponent
								card={card}
								scoreType={scoreType}
								inStatistics
								activeCard
							/>
						)
					)}
				</li>
			))}
		</ul>
	);
};

export default RenderCards;
