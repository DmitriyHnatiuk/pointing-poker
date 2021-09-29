import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { getGame } from 'redux/reducer/selectors';
import {
	addPlayingCard,
	setIsAdminAsPlayerIsTimer,
	setIsTimer,
	setScoreType
} from 'redux/reducer/gameSettingReducer';
import { Game } from 'redux/reducer/gameSettingReducer/types';

import { useTypedSelector } from 'hooks/useTypedSelector';

import Switch from 'components/common/Switch';
import PlayingCardComponent from 'components/common/PlayingCard';

import addCardImage from 'assets/images/PlayingCard/add_card.svg';

import styles from './index.module.scss';

const AdminMenu: React.FC = (): JSX.Element => {
	const { cards, scoreType } = useTypedSelector<Game>(getGame);

	const dispatch = useDispatch();

	const onAddCard = () => {
		dispatch(addPlayingCard());
	};

	const onToggleIsMasterAsPlayer = (): void => {
		dispatch(setIsAdminAsPlayerIsTimer());
	};

	const onToggleIsTimer = (): void => {
		dispatch(setIsTimer());
	};

	const onChangeScoreType = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setScoreType(e.target.value.trim().toUpperCase().slice(0, 2)));
	};

	return (
		<div id="adminLobbyMenu" className={styles.adminLobbyMenu}>
			<h2 className={styles.SettingsTitle}>Game settings:</h2>
			<div className={styles.settings}>
				<span>
					<h3>Scram master as player:</h3>
					<Switch setValue={onToggleIsMasterAsPlayer} />
				</span>
				<span>
					<h3>Changing card in round end:</h3>
					<Switch />
				</span>
				<span>
					<h3>Is timer needed:</h3>
					<Switch setValue={onToggleIsTimer} />
				</span>
				<span>
					<h3>Score type:</h3>
					<input
						className={styles.scoreInput}
						type="text"
						placeholder="Enter your score type..."
					/>
				</span>
				<span>
					<h3>Score type (Short):</h3>
					<input
						className={styles.scoreInput}
						type="text"
						placeholder="Your score type (short)"
						onChange={onChangeScoreType}
						maxLength={10}
					/>
				</span>
				<span>
					<h3>Round time:</h3>
				</span>
			</div>
			<div className={styles.cardsWrapper}>
				<h2>Add card values:</h2>
				<div className={styles.cards}>
					{cards.map((card) => {
						return (
							<PlayingCardComponent
								card={card}
								key={card.id}
								scoreType={scoreType}
							/>
						);
					})}
					<div className={styles.card}>
						<img
							src={addCardImage}
							alt="add_card"
							title="Add Card"
							onClick={onAddCard}
							aria-hidden="true"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminMenu;
