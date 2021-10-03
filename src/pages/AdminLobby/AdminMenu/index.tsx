import React from 'react';
import { useDispatch } from 'react-redux';

import { getGame, getMembers } from 'redux/reducer/selectors';
import {
	addPlayingCardAction,
	SetIsAdminAsPlayer,
	SetIsTimer,
	SetScoreType,
	changePlayingCardSetAction
} from 'redux/reducer/gameSettingReducer';
import { setUserDataActionCreation } from 'redux/reducer/userReducer';
import {
	Game,
	PlayingCardSetEnum
} from 'redux/reducer/gameSettingReducer/types';

import { useTypedSelector } from 'hooks/useTypedSelector';
import {
	getNewPlayingCard,
	useChangePlayingCardSet
} from 'hooks/useChangePlayingCardSet';

import Switch from 'components/common/Switch';
import PlayingCardComponent from 'components/common/PlayingCard';
import InstallTimer from 'components/common/Timer/InstallTimer';

import addCardImage from 'assets/images/PlayingCard/add_card.svg';

import styles from './index.module.scss';

const AdminMenu: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();

	const { observer } = useTypedSelector(getMembers);
	const { cards, scoreType, playingCardsSet, isTimer } =
		useTypedSelector<Game>(getGame);
	const { fibonacciNumbers, degreeTwo, linearSequence } = PlayingCardSetEnum;

	useChangePlayingCardSet();

	const newPlayingCard = getNewPlayingCard();

	const onAddCard = () => {
		dispatch(addPlayingCardAction(newPlayingCard));
	};

	const onToggleIsMasterAsPlayer = (): void => {
		dispatch(SetIsAdminAsPlayer(!observer));
		dispatch(setUserDataActionCreation({ observer: !observer }));
	};

	const onToggleIsTimer = (): void => {
		dispatch(SetIsTimer());
	};

	const onChangeScoreType = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(SetScoreType(e.target.value.trim().toUpperCase().slice(0, 2)));
	};

	const onChangeSetOfCards = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(changePlayingCardSetAction(e.target.value));
	};

	return (
		<div id="adminLobbyMenu" className={styles.adminLobbyMenu}>
			<h2 className={styles.SettingsTitle}>Game settings:</h2>
			<div className={styles.settings}>
				<span>
					<h3>Scram master as player:</h3>
					<Switch setValue={onToggleIsMasterAsPlayer} value={!observer} />
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
					<h3>Which set of cards:</h3>
					<select
						className={styles.scoreInput}
						value={playingCardsSet}
						onChange={onChangeSetOfCards}>
						<option value={fibonacciNumbers}>{fibonacciNumbers}</option>
						<option value={degreeTwo}>{degreeTwo}</option>
						<option value={linearSequence}>{linearSequence}</option>
					</select>
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

				<div className={styles.timerContent}>
					{isTimer && (
						<>
							<h3>Round time:</h3>
							<InstallTimer />
						</>
					)}
				</div>
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
