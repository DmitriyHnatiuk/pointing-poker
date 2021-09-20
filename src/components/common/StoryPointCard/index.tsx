import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
	scoreEdit,
	toggleScoreEdit
} from 'redux/reducer/storyPointCardsReducer';
import { ISPCard } from 'redux/reducer/storyPointCardsReducer/types';

import pencil from 'assets/images/StoryPointCard/pencil.svg';

import styles from './index.module.scss';

const StoryPointCard: React.FC<{ card: ISPCard }> = ({ card }) => {
	const { score, isScoreEdit, type } = card;

	const dispatch = useDispatch();

	const onEditScore = (e: React.ChangeEvent<HTMLInputElement>): void => {
		dispatch(scoreEdit(card, e.target.value));
	};

	const onToggleScoreEdit = () => {
		dispatch(toggleScoreEdit(card));
	};

	const onDeleteCard = () => {
		console.log('delete');
	};

	return (
		<section className={styles.card}>
			<div className={styles.content}>
				<div className={styles.top}>
					<input
						type="text"
						value={score}
						// onBlur={onBlur}
						onChange={onEditScore}
						disabled={!isScoreEdit}
					/>
					<img
						src={pencil}
						alt="pencil"
						onClick={onToggleScoreEdit}
						aria-hidden="true"
						title="Delete card"
					/>
				</div>
				<div className={styles.type}>SP</div>
				<span className={styles.bottom}>{score}</span>
			</div>
		</section>
	);
};

export default StoryPointCard;
