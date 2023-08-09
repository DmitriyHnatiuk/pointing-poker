import socketCreator from '_redux/thunk';
import { MouseEvent, memo, useCallback } from 'react';

import { useAppDispatch, useTypedSelector } from 'src/hooks/useTypedSelector';

import {
	deletePlayingCard,
	editPlayingCard
} from '_redux/reducer/planningReducer';
import {
	selectLoginStatus,
	selectPlanningSettingsScore
} from '_redux/reducer/planningReducer/selectors';
import { selectUserData } from '_redux/reducer/userReducer/selectors';

import DeleteCardImg from '_assets/images/CardPlayer/player-delete.svg?url';
import IconActiveCardImg from '_assets/images/PlayingCard/active_card.svg?url';
import CupImg from '_assets/images/PlayingCard/cup.svg?url';

import { EVENTS } from 'src/constants/constRouter';
import { useDebounce } from 'src/hooks/useDebounce';

import Button from '../Button';
import Input from '../Form/Input';

import styles from './index.module.scss';

type PropsType = {
	cardId: string;
	activeCard?: boolean;
	inStatistics?: boolean;
	style?: string;
	score: string;
	isFirstCard?: boolean;
	isActiveCard?: boolean;
};

const PlayingCard = ({
	cardId,
	activeCard,
	inStatistics,
	style = '',
	score,
	isFirstCard,
	isActiveCard
}: PropsType) => {
	const dispatch = useAppDispatch();

	const isLoginOpen = useTypedSelector(selectLoginStatus);
	const scoreType = useTypedSelector(selectPlanningSettingsScore);
	const { isAdmin, isObserver } = useTypedSelector(selectUserData);

	const debouncedCallback = useDebounce((value: string) => {
		dispatch(
			editPlayingCard({ card: { cardId, score, isFirstCard }, score: value })
		);
	});

	const onEditScore = useCallback(
		(value: string) => {
			debouncedCallback(value);
		},
		[debouncedCallback]
	);

	const onDeleteCard = useCallback((event: MouseEvent) => {
		event.stopPropagation();
		dispatch(deletePlayingCard({ id: cardId }));
	}, []);

	const onActiveCard = useCallback(() => {
		if (activeCard && !isObserver) {
			dispatch(
				socketCreator({
					type: EVENTS.SELECT_CARD,
					id: cardId
				})
			);
		}
	}, [activeCard]);

	return (
		<>
			<div
				className={`${styles.card} ${style} ${
					inStatistics ? styles.statistics_card : ''
				}`}
				onClick={onActiveCard}>
				{isActiveCard && (
					<div className={styles.active_card}>
						<img
							width="40"
							height="40"
							src={IconActiveCardImg}
							alt="Active card"
						/>
					</div>
				)}
				<div className={styles.content}>
					<div className={styles.top}>
						{isAdmin && !activeCard && !inStatistics ? (
							<Input
								name={`score card ${cardId}`}
								style={styles.input}
								defaultValue={score}
								onChange={onEditScore}
							/>
						) : (
							<span className="text">{score}</span>
						)}
						{!isLoginOpen && !activeCard && !inStatistics && (
							<Button
								style={styles.del_button}
								variant="icon"
								onClick={onDeleteCard}>
								<img src={DeleteCardImg} alt="Delete card" />
							</Button>
						)}
					</div>
					<div className={styles.type}>
						{isFirstCard ? (
							<img src={CupImg} alt="Cup" loading="lazy" />
						) : (
							scoreType
						)}
					</div>
					<span className={`${styles.bottom} text`}>{score}</span>
				</div>
			</div>
		</>
	);
};

export default memo(PlayingCard);
