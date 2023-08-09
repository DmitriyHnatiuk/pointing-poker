import { ChangeEvent, useCallback } from 'react';

import {
	changePlayingCard,
	setPlayingCard,
	setScoreType,
	switchIsRevertCard,
	switchIsTimerNeeded
} from '_redux/reducer/planningReducer';
import {
	selectPlanningSettings,
	selectTypeOfCards
} from '_redux/reducer/planningReducer/selectors';
import { PlayingCardSetEnum } from '_redux/reducer/planningReducer/types';
import { setObserver } from '_redux/reducer/userReducer';
import { selectUserData } from '_redux/reducer/userReducer/selectors';

import { useDebounce } from 'src/hooks/useDebounce';
import { useAppDispatch, useTypedSelector } from 'src/hooks/useTypedSelector';

import CardBackList from 'src/components/common/CardBack';
import CardsValue from 'src/components/common/CardsValue';
import Input from 'src/components/common/Form/Input';
import Select from 'src/components/common/Form/Select';
import Switch from 'src/components/common/Form/Switch';
import InstallTimer from 'src/components/common/Timer/InstallTimer';

import { optionsCardDeck } from 'src/constants/commonComponents';

import styles from './index.module.scss';

const AdminMenu = () => {
	const dispatch = useAppDispatch();

	const {
		playingCardsSet,
		isTimerNeeded,
		isRevertCard,
		scoreType,
		typeCards,
		amountCard
	} = useTypedSelector(selectPlanningSettings);

	const { isObserver } = useTypedSelector(selectUserData);
	const typeOfCards = useTypedSelector(selectTypeOfCards);

	const onToggleIsMasterAsPlayer = useCallback(
		() => dispatch(setObserver(!isObserver)),
		[isObserver]
	);

	const onToggleIsTimer = useCallback(() => {
		dispatch(switchIsTimerNeeded());
	}, []);

	const onToggleIsRevertCard = useCallback(() => {
		dispatch(switchIsRevertCard());
	}, []);

	const debouncedChangeHandler = useCallback(
		useDebounce((value: string) => {
			dispatch(setScoreType(value.trim().toUpperCase().slice(0, 2)));
		}),
		[]
	);

	const onChangeScoreType = useCallback(
		(value: string) => {
			debouncedChangeHandler(value);
		},
		[debouncedChangeHandler]
	);

	const onChangeSetOfCards = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			const value = event.target.value as keyof {
				[key in PlayingCardSetEnum]: any;
			};

			dispatch(changePlayingCard(value));

			return dispatch(setPlayingCard(typeOfCards[value]()));
		},
		[]
	);

	return (
		<div className="p-10-0">
			<h3 className="title-3 text-align-center">Game settings:</h3>
			<div className={styles.settings}>
				<Switch
					name="as_player"
					style={styles.params}
					onChange={onToggleIsMasterAsPlayer}
					value={!isObserver}
					label="Scram master as player:"
				/>

				<Switch
					name="revert_card"
					style={styles.params}
					label="Changing card in round end:"
					onChange={onToggleIsRevertCard}
					value={isRevertCard}
				/>

				<Switch
					name="timer_is_needed"
					style={styles.params}
					onChange={onToggleIsTimer}
					label="Is timer needed:"
					value={isTimerNeeded}
				/>

				<Select
					style={`${styles.params} ${styles.input_style}`}
					label="Which set of cards:"
					name="card_deck"
					options={optionsCardDeck}
					value={playingCardsSet}
					onChange={onChangeSetOfCards}
				/>

				<Input
					style={`${styles.params} ${styles.input_style}`}
					name="score_type"
					label="Score type (Short):"
					defaultValue={scoreType}
					placeholder="Your score type (short)"
					onChange={onChangeScoreType}
					maxLength={10}
					isLeftLabel
				/>

				{isTimerNeeded && (
					<div className={styles.timer_content}>
						<h3 className={styles.title}>Round time:</h3>
						<InstallTimer />
					</div>
				)}
			</div>
			<div className="m-top-20">
				<CardBackList {...{ typeCards }} />
				<CardsValue {...{ playingCardsSet, amountCard }} />
			</div>
		</div>
	);
};

export default AdminMenu;
