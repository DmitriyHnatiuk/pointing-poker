import React from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from 'hooks/useTypedSelector';
import { TimerSettings } from 'redux/reducer/gameSettingReducer/types';
import { setTimer } from 'redux/reducer/gameSettingReducer';
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

	const timers = false;

	const updateTimer = (newTime: TimerSettings) => {
		dispatch(setTimer(newTime));
	};
	const setInterval = () => interval(timer, updateTimer);

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
					{!timers && <MyButton value={RUN_ROUND} onclick={setInterval} />}
					{timers && <MyButton value={RESTART_ROUND} />}
					{timers && <MyButton value={NEXT_ISSUE} />}
				</div>
			)}
		</>
	);
};

export default ActiveTimer;
