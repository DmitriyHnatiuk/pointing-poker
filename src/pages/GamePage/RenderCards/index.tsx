import React from 'react';

import PlayingCardComponent from 'components/common/PlayingCard';
import { Game } from 'redux/reducer/gameSettingReducer/types';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { getGame, getMembers } from 'redux/reducer/selectors';

import { imagesCardBack } from 'constants/commonComponents';

import styles from './index.module.scss';

const RenderCards: React.FC<{ inStatistics?: boolean }> = ({
	inStatistics
}): JSX.Element => {
	const { cards, scoreType, runRound, typeCards } =
		useTypedSelector<Game>(getGame);
	const { observer } = useTypedSelector(getMembers);

	let newCards = cards;

	if (inStatistics) {
		newCards = [...cards.filter((card) => card.count > 0)];
	}

	const BackCard: React.FC = () => {
		return (
			<>
				<div className={styles.back}>
					<img
						className={styles.imageBack}
						src={imagesCardBack[typeCards]}
						alt=""
					/>
				</div>
			</>
		);
	};

	return (
		<ul className={styles.cards}>
			{newCards.map((card) => (
				<li
					key={card.id}
					className={`${styles.card} ${runRound && styles.flip}`}>
					{inStatistics ? (
						<PlayingCardComponent
							card={card}
							scoreType={scoreType}
							inStatistics
						/>
					) : (
						!observer && (
							<div className={styles.cardItem}>
								<PlayingCardComponent
									style={styles.front}
									card={card}
									scoreType={scoreType}
									inStatistics
									activeCard
								/>
								<BackCard />
							</div>
						)
					)}
				</li>
			))}
		</ul>
	);
};

export default RenderCards;
