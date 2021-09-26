import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from 'hooks/useTypedSelector';
import { TimerSettings } from 'redux/reducer/gameSettingReducer/types';
import { setTimer } from 'redux/reducer/gameSettingReducer';

import styles from './index.module.scss';

const InstallTimer: React.FC = () => {
	const dispatch = useDispatch();
	const { timer } = useTypedSelector((state) => state.gameSettings);
	const { min, sec } = timer;

	const updateTimer = (newTime: TimerSettings) => {
		dispatch(setTimer(newTime));
	};

	const validateInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		if (!/\d{1,2}|^$/.test(value)) {
			return;
		}

		if (Number(value) > 59) {
			updateTimer({ ...timer, [name]: '59' });
			return;
		}

		if (value.length > 2) {
			updateTimer({ ...timer, [name]: '00' });
			return;
		}
		updateTimer({ ...timer, [name]: value });
	};

	const onBlurInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;

		if (!value) {
			updateTimer({ ...timer, [name]: `00` });
			return;
		}

		if (value.length < 2) {
			updateTimer({ ...timer, [name]: `0${value}` });
		}
	};

	return (
		<div className={styles.timer}>
			<div className={styles.clockBlock}>
				<label className={styles.clockLabel}>Minutes</label>
				<input
					value={min}
					className={styles.clockInput}
					type="text"
					name="min"
					onBlur={onBlurInput}
					onChange={validateInput}
				/>
			</div>
			<span className={styles.separator}>:</span>
			<div className={styles.clockBlock}>
				<label className={styles.clockLabel}>Seconds</label>
				<input
					value={sec}
					className={styles.clockInput}
					type="text"
					name="sec"
					onBlur={onBlurInput}
					onChange={validateInput}
				/>
			</div>
		</div>
	);
};
export default InstallTimer;
