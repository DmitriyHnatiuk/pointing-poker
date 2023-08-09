import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { addPlayingCard } from '_redux/reducer/planningReducer';
import { selectCards } from '_redux/reducer/planningReducer/selectors';

import { useTypedSelector } from 'src/hooks/useTypedSelector';
import { getNewPlayingCard } from 'src/utils/getPlayingCards';
import Button from '../Button';
import PlayingCard from '../PlayingCard';

import AddCardImage from '_assets/images/PlayingCard/add_card.svg?url';

import { PlayingCardSetEnum } from '_redux/reducer/planningReducer/types';
import styles from './styles.module.scss';

type PropsType = { playingCardsSet: PlayingCardSetEnum; amountCard: number };

const CardsValue = ({ playingCardsSet, amountCard }: PropsType) => {
	const dispatch = useDispatch();

	const cards = useTypedSelector(selectCards);

	const onAddCard = useCallback(() => {
		dispatch(
			addPlayingCard({
				newCard: getNewPlayingCard({ playingCardsSet, amountCard })
			})
		);
	}, []);

	return (
		<>
			<h3 className="title-3 text-align-center m-top-20">Add card values:</h3>
			<ul className={styles.cards}>
				{Boolean(cards) &&
					Object.values(cards).map((card) => (
						<li key={card.cardId}>
							<PlayingCard {...card} />
						</li>
					))}
				<li className={styles.card}>
					<Button variant="icon" onClick={onAddCard}>
						<img src={AddCardImage} alt="add_card" />
					</Button>
				</li>
			</ul>
		</>
	);
};

export default memo(CardsValue);
