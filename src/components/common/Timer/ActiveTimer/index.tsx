import React from 'react';
import { useDispatch } from 'react-redux';

import { useInterval } from 'hooks/useInterval';
import { useTypedSelector } from 'hooks/useTypedSelector';

import socketCreator, { RESET_GAME } from 'redux/thunk';

import { TimerSettings } from 'redux/reducer/gameSettingReducer/types';
import { SetActiveTimer, SetTimer } from 'redux/reducer/gameSettingReducer';
import { getGame, getMembers } from 'redux/reducer/selectors';

import { btnValue } from 'constants/commonComponents';
import MyButton from 'components/common/MyButton';

import styles from './index.module.scss';

const { RUN_ROUND, RESTART_ROUND, NEXT_ISSUE } = btnValue;

const ActiveTimer: React.FC = () => {
	const dispatch = useDispatch();
	const { timer } = useTypedSelector(getGame);
	const { isAdmin } = useTypedSelector(getMembers);
	const { isActive } = useTypedSelector(getGame).timer;
	const { isTimer } = useTypedSelector(getGame);

	const updateTimer = (newTime: TimerSettings) => {
		dispatch(SetTimer(newTime));
	};

	if (isTimer) {
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
						dispatch(SetActiveTimer(false));
					}
				}

				const minString: string = minNum < 10 ? `0${minNum}` : `${minNum}`;
				const secString: string = secNum < 10 ? `0${secNum}` : `${secNum}`;

				return updateTimer({ min: minString, sec: secString });
			},
			delay: isActive ? 1000 : null
		});
	}

	const onTimer = () => {
		dispatch(SetActiveTimer(true));
	};

	const onRestartTimer = () => dispatch(socketCreator({ type: RESET_GAME }));

	const onNextIssue = () => dispatch(SetActiveTimer(false));

	return (
		<>
			{isTimer && (
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
					{!isActive && (
						<MyButton style={styles.btn} value={RUN_ROUND} onclick={onTimer} />
					)}
					{isActive && (
						<>
							<MyButton
								style={styles.btn}
								value={RESTART_ROUND}
								onclick={onRestartTimer}
							/>
							<MyButton
								style={styles.btn}
								value={NEXT_ISSUE}
								onclick={onNextIssue}
							/>
						</>
					)}
				</div>
			)}
		</>
	);
};

export default ActiveTimer;
