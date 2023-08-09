import { useTypedSelector } from 'src/hooks/useTypedSelector';

import {
	selectCards,
	selectPlanningSettings,
	selectRoundStatus
} from '_redux/reducer/planningReducer/selectors';
import { selectUserData } from '_redux/reducer/userReducer/selectors';
import { selectActiveCardId } from '_redux/reducer/usersVote/selectors';

import PlayingCard from 'src/components/common/PlayingCard';

import { BackCard } from './BackCard';

import styles from './index.module.scss';

const RenderCards = () => {
	const { isAdmin, isObserver } = useTypedSelector(selectUserData);
	const { isRevertCard } = useTypedSelector(selectPlanningSettings);
	const selectedCardId = useTypedSelector(selectActiveCardId);

	const isRunRound = useTypedSelector(selectRoundStatus);

	const cards = useTypedSelector(selectCards);

	return (
		<ul className={styles.cards}>
			{(isRevertCard || isAdmin || isRunRound) &&
				Object.values(cards).map((card) => (
					<li
						key={card.cardId}
						className={`${styles.card} ${
							!isRunRound && isRevertCard && (isAdmin || !isObserver)
								? styles.flip
								: ''
						}`}>
						<div className={styles.card_item}>
							<PlayingCard
								{...card}
								activeCard
								isActiveCard={selectedCardId === card.cardId}
							/>
							{(isObserver && !isAdmin) || (isRevertCard && <BackCard />)}
						</div>
					</li>
				))}
		</ul>
	);
};

export default RenderCards;
