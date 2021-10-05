import React from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from 'hooks/useTypedSelector';
import socketCreator, { SELECT_CARD } from 'redux/thunk';

import { getMembers, getGame } from 'redux/reducer/selectors';
import { PlayingCard } from 'redux/reducer/gameSettingReducer/types';
import {
	activePlayingCardAction,
	deletePlayingCard,
	editPlayingCard
} from 'redux/reducer/gameSettingReducer';

import deleteCard from 'assets/images/CardPlayer/player-delete.svg';
import cup from 'assets/images/PlayingCard/cup.svg';
import iconActiveCard from 'assets/images/PlayingCard/active_card.svg';

import styles from './index.module.scss';

const PlayingCardComponent: React.FC<{
	card: PlayingCard;
	scoreType: string;
	activeCard?: boolean;
	inStatistics?: boolean;
}> = ({ card, scoreType, activeCard, inStatistics }) => {
	const dispatch = useDispatch();

	const { login } = useTypedSelector(getMembers);
	const { runRound } = useTypedSelector(getGame);
	const { score, isFirstCard, active, id } = card;
	const cardId = id.toString();
	const isActive = activeCard && active;

	const onEditScore = (e: React.ChangeEvent<HTMLInputElement>): void => {
		dispatch(editPlayingCard(card, e.target.value));
	};

	const onDeleteCard = () => {
		dispatch(deletePlayingCard(card));
	};

	const onActiveCard = (event: React.MouseEvent<HTMLElement>) => {
		if (activeCard && runRound) {
			const selectCardId = (event.currentTarget as HTMLElement).id;
			dispatch(socketCreator({ type: SELECT_CARD, id: selectCardId }));
			return dispatch(activePlayingCardAction(card));
		}
		return null;
	};
	return (
		<>
			<section
				className={`${styles.card} ${inStatistics && styles.statisticsCard}`}
				aria-hidden="true"
				id={cardId}
				onClick={onActiveCard}>
				{isActive && (
					<div className={styles.activeCard}>
						<img
							width="40"
							height="40"
							src={iconActiveCard}
							alt="Active card"
						/>
					</div>
				)}
				<div className={styles.content}>
					<div className={styles.top}>
						{inStatistics ? (
							<span className={styles.input}>{score}</span>
						) : (
							<input
								className={styles.input}
								type="text"
								value={score}
								onChange={onEditScore}
							/>
						)}
						{!login && (
							<img
								src={deleteCard}
								alt="Delete card"
								aria-hidden="true"
								onClick={onDeleteCard}
							/>
						)}
					</div>
					<div className={styles.type}>
						{isFirstCard ? <img src={cup} alt="Cup" /> : scoreType}
					</div>
					<span className={styles.bottom}>{score}</span>
				</div>
			</section>
			{!activeCard && login && <span>{card.count} %</span>}
		</>
	);
};

export default PlayingCardComponent;
