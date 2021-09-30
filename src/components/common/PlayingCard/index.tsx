import React from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from 'hooks/useTypedSelector';

import { getMembers } from 'redux/reducer/selectors';
import { PlayingCard } from 'redux/reducer/gameSettingReducer/types';
import {
	editPlayingCard,
	deletePlayingCard
} from 'redux/reducer/gameSettingReducer';

import deleteCard from 'assets/images/CardPlayer/player-delete.svg';
import cup from 'assets/images/PlayingCard/cup.svg';

import styles from './index.module.scss';

const PlayingCardComponent: React.FC<{ card: PlayingCard; scoreType: string }> =
	({ card, scoreType }) => {
		const dispatch = useDispatch();
		const { login } = useTypedSelector(getMembers);
		const { score, isFirstCard } = card;

		const onEditScore = (e: React.ChangeEvent<HTMLInputElement>): void => {
			dispatch(editPlayingCard(card, e.target.value));
		};

		const onDeleteCard = () => {
			dispatch(deletePlayingCard(card));
		};

		return (
			<section className={styles.card}>
				<div className={styles.content}>
					<div className={styles.top}>
						<input
							className={styles.input}
							type="text"
							value={score}
							onChange={onEditScore}
						/>
						{!login && (
							<img
								src={deleteCard}
								alt="pencil"
								aria-hidden="true"
								title="Delete card"
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
		);
	};

export default PlayingCardComponent;
