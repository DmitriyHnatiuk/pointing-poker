import React from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from 'hooks/useTypedSelector';
import { TimerSettings } from 'redux/reducer/gameSettingReducer/types';
import { setActiveTimer, setTimer } from 'redux/reducer/gameSettingReducer';
import { getGame, getMembers } from 'redux/reducer/selectors';

import { interval } from 'utils/timer';

import { btnValue } from 'constants/commonComponents';
import MyButton from 'components/common/MyButton';

import styles from './index.module.scss';

const { RUN_ROUND, RESTART_ROUND, NEXT_ISSUE } = btnValue;

const ActiveTimer: React.FC = () => {
	const dispatch = useDispatch();
	const { timer } = useTypedSelector(getGame);
	const { isAdmin } = useTypedSelector(getMembers);
	const { isActive } = timer;

	const updateTimer = (newTime: TimerSettings) => {
		dispatch(setTimer(newTime));
	};

	if (timer.min === '00' && timer.sec === '00') {
		interval({ timer, updateTimer, onStopTimer: true });
	}

	const onTimer = () => {
		dispatch(setActiveTimer(true));
		interval({ timer, updateTimer });
	};

	const onRestartTimer = () =>
		interval({ timer, updateTimer, onRestartTimer: true });

	const onNextIssue = () => {
		interval({ timer, updateTimer, onStopTimer: true });
		// onTimer();
	};

	return (
		<>
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
			{isAdmin && (
				<div className={styles.buttons}>
					{!isActive && <MyButton value={RUN_ROUND} onclick={onTimer} />}
					{isActive && (
						<>
							<MyButton value={RESTART_ROUND} onclick={onRestartTimer} />
							<MyButton value={NEXT_ISSUE} onclick={onNextIssue} />
						</>
					)}
				</div>
			)}
		</>
	);
};

export default ActiveTimer;
