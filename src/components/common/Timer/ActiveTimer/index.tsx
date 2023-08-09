import { useCallback } from 'react';

import socketCreator from '_redux/thunk';

import { useInterval } from 'src/hooks/useInterval';
import { useAppDispatch, useTypedSelector } from 'src/hooks/useTypedSelector';

import { setTimer } from '_redux/reducer/planningReducer';
import {
	selectPlanningSettings,
	selectPlanningTimer,
	selectRoundStatus
} from '_redux/reducer/planningReducer/selectors';
import { TimerSettingsType } from '_redux/reducer/planningReducer/types';
import { selectUserData } from '_redux/reducer/userReducer/selectors';

import Button from 'src/components/common/Button';

import { BUTTON_VALUES } from 'src/constants/commonComponents';
import { EVENTS } from 'src/constants/constRouter';

import styles from './index.module.scss';

const { RUN_ROUND, RESTART_ROUND, NEXT_ISSUE } = BUTTON_VALUES;

const ActiveTimer = () => {
	const dispatch = useAppDispatch();

	const { isAdmin } = useTypedSelector(selectUserData);
	const { isTimerNeeded } = useTypedSelector(selectPlanningSettings);
	const timer = useTypedSelector(selectPlanningTimer);
	const isRunRound = useTypedSelector(selectRoundStatus);

	const updateTimer = useCallback((timer: TimerSettingsType) => {
		dispatch(setTimer({ timer }));
	}, []);

	if (isTimerNeeded) {
		useInterval({
			callback: () => {
				let minNum = Number(timer.min);
				let secNum = Number(timer.sec);
				if (minNum >= 0) {
					if (secNum === 0 && minNum > 0) {
						minNum -= 1;
						secNum = 59;
					} else if (secNum > 0 && minNum >= 0) {
						secNum -= 1;
					} else {
						dispatch(socketCreator({ type: EVENTS.PLANNING_TIME_OFF }));
					}
				}

				const minString: string = minNum < 10 ? `0${minNum}` : `${minNum}`;
				const secString: string = secNum < 10 ? `0${secNum}` : `${secNum}`;

				return updateTimer({ min: minString, sec: secString });
			},
			delay: isRunRound ? 1000 : null
		});
	}

	const onTimer = useCallback(() => {
		dispatch(socketCreator({ type: EVENTS.ADMIN_RUN_ROUND }));
	}, []);

	const onRestartTimer = useCallback(
		() => dispatch(socketCreator({ type: EVENTS.RESET_PLANNING })),
		[]
	);

	const onNextIssue = useCallback(
		() => dispatch(socketCreator({ type: EVENTS.SET_NEXT_ISSUE })),
		[]
	);

	return (
		<>
			{isTimerNeeded && (
				<div className={styles.timer}>
					<div className={styles.clockBlock}>
						<span className={styles.clockName}>Minutes</span>
						<div className={styles.clockView}>{timer.min}</div>
					</div>
					<div className={styles.clockBlock}>
						<span className={styles.clockName}>Seconds</span>
						<div className={styles.clockView}>{timer.sec}</div>
					</div>
				</div>
			)}
			{isAdmin && (
				<div className={styles.buttons}>
					{isRunRound ? (
						<Button
							style={styles.primary_button}
							children={RESTART_ROUND}
							onClick={onRestartTimer}
						/>
					) : (
						<Button
							style={styles.main_button}
							children={RUN_ROUND}
							onClick={onTimer}
						/>
					)}
					<Button
						style={`${styles.primary_button} ${
							!isRunRound ? styles.hide_button : ''
						}`}
						children={NEXT_ISSUE}
						onClick={onNextIssue}
					/>
				</div>
			)}
		</>
	);
};

export default ActiveTimer;
