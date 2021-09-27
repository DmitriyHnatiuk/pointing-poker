import React, { MouseEventHandler } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from 'hooks/useTypedSelector';
import { TimerSettings } from 'redux/reducer/gameSettingReducer/types';
import { setTimer } from 'redux/reducer/gameSettingReducer';

import styles from './index.module.scss';

const ActiveTimer = () => {
	const dispatch = useDispatch();
	const { timer } = useTypedSelector((state) => state.gameSettings);

	const updateTimer = (newTime: TimerSettings) => {
		dispatch(setTimer(newTime));
	};

	const interval: MouseEventHandler<HTMLButtonElement> = () => {
		let minNum = Number(timer.min);
		let secNum = Number(timer.sec);
		const test = setInterval(() => {
			if (minNum >= 0) {
				if (secNum === 0 && minNum > 0) {
					minNum -= 1;
					secNum = 59;
				} else if (secNum > 0 && minNum >= 0) {
					secNum -= 1;
				} else {
					clearInterval(test);
				}
			}

			const minString: string = minNum < 10 ? `0${minNum}` : `${minNum}`;
			const secString: string = secNum < 10 ? `0${secNum}` : `${secNum}`;

			return updateTimer({ min: minString, sec: secString });
		}, 1000);
	};

	return (
		<div className={styles.block}>
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

			<button
				className={styles.btn}
				type="button"
				value="Start"
				onClick={interval}>
				Run round
			</button>
		</div>
	);
};

export default ActiveTimer;
