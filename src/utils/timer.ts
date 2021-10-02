import { TimerSettings } from 'redux/reducer/gameSettingReducer/types';

export const interval = (
	timer: TimerSettings,
	updateTimer: ({ min, sec }: TimerSettings) => void
) => {
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
	return test;
};
