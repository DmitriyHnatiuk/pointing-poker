import React from 'react';
import { useDispatch } from 'react-redux';

import { getGame, getMembers } from 'redux/reducer/selectors';
import {
	addPlayingCardAction,
	changePlayingCardSetAction,
	SetIsAdminAsPlayer,
	SetIsTimer,
	SetScoreType
} from 'redux/reducer/gameSettingReducer';
import { setUserDataActionCreation } from 'redux/reducer/userReducer';
import {
	Game,
	PlayingCardSetEnum
} from 'redux/reducer/gameSettingReducer/types';

import { useTypedSelector } from 'hooks/useTypedSelector';
import { useChangePlayingCardSet } from 'hooks/useChangePlayingCardSet';

import { getNewPlayingCard } from 'utils/getPlayingCards';

import Switch from 'components/common/Switch';
import PlayingCardComponent from 'components/common/PlayingCard';
import InstallTimer from 'components/common/Timer/InstallTimer';
import CardBackList from 'components/CardBack';

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
					<h3 className={styles.title}>Scram master as player:</h3>
					<Switch setValue={onToggleIsMasterAsPlayer} value={!observer} />
				</span>
				<span>
					<h3 className={styles.title}>Changing card in round end:</h3>
					<Switch />
				</span>
				<span>
					<h3 className={styles.title}>Is timer needed:</h3>
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
					<h3 className={styles.title}>Score type (Short):</h3>
					<input
						className={styles.scoreInput}
						type="text"
						placeholder="Your score type (short)"
						onChange={onChangeScoreType}
						maxLength={10}
					/>
				</span>
				{isTimer && (
					<div className={styles.timerContent}>
						<h3>Round time:</h3>
						<InstallTimer />
					</div>
				)}
			</div>
			<div className={styles.cardsWrapper}>
				<h2 className={styles.title}>Select cover:</h2>
				<CardBackList />
				<h2 className={styles.title}>Add card values:</h2>
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
