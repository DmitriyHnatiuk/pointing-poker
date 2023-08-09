import { memo } from 'react';

import { useAppDispatch, useTypedSelector } from 'src/hooks/useTypedSelector';

import { setTimer } from '_redux/reducer/planningReducer';
import { selectPlanningTimer } from '_redux/reducer/planningReducer/selectors';

import { TimerSettingsType } from '_redux/reducer/planningReducer/types';

import Input from '../../Form/Input';

import styles from './index.module.scss';

type PropsType = {
	title: string;
	value: string;
	name: string;
	validateInput: (value: string, name: string) => void;
};

const ClockTemplate = ({ title, value, name, validateInput }: PropsType) => (
	<Input
		label={title}
		value={value}
		min="0"
		max="59"
		type="number"
		maxLength={2}
		style={styles.clock_container}
		name={name}
		onChange={validateInput}
	/>
);

const InstallTimer = () => {
	const dispatch = useAppDispatch();
	const timer = useTypedSelector(selectPlanningTimer);
	const { min, sec } = timer;

	const updateTimer = (timer: TimerSettingsType) => {
		dispatch(setTimer({ timer }));
	};

	const validateInput = (value: string, name: string) => {
		updateTimer({
			...timer,
			[name]: value.substring(value.length - 2).padStart(2, '0')
		});
	};

	return (
		<div className={styles.timer}>
			<ClockTemplate
				title="Minutes"
				value={min}
				name="min"
				validateInput={validateInput}
			/>
			<span className={styles.separator}>:</span>
			<ClockTemplate
				title="Seconds"
				value={sec}
				name="sec"
				validateInput={validateInput}
			/>
		</div>
	);
};
export default memo(InstallTimer);
