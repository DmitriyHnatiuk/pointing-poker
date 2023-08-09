import { IGitHubRefs } from '../interfaces/commonComponents';
import { IOptions } from '../interfaces/commonForm';
import { PlayingCardSetEnum } from '../redux/reducer/planningReducer/types';

export const RSS_HREF = 'https://rs.school';

export const GitHubRefs: Array<IGitHubRefs> = [
	{
		href: 'https://github.com/DmitriyHnatiuk',
		name: 'dmitriyhnatiuk'
	},
	{
		href: 'https://github.com/syleimanovsergey',
		name: 'syleimanovsergey'
	},
	{ href: 'https://github.com/NiFroPP', name: 'nifropp' }
];

export enum BUTTON_VALUES {
	START = 'Start new game',
	CONNECT = 'Connect',
	CONFIRM = 'Confirm',
	CANCEL = 'Cancel',
	START_GAME = 'Start Game',
	STOP_GAME = 'Stop Game',
	RUN_ROUND = 'Run Round',
	RESTART_ROUND = 'Restart Round',
	NEXT_ISSUE = 'Next Issue',
	CANCEL_GAME = 'Cancel game',
	YES = 'Yes',
	NO = 'No',
	COPY = 'Copy',
	EXIT = 'Exit',
	SEND = 'Send'
}

const { fibonacciNumbers, degreeTwo, linearSequence } = PlayingCardSetEnum;

export const optionsCardDeck = [
	{ key: degreeTwo, value: degreeTwo },
	{ key: linearSequence, value: linearSequence },
	{ key: fibonacciNumbers, value: fibonacciNumbers }
];

export const OPTIONS_PRIORITY: IOptions[] = [
	{ key: 'Low', value: 'low' },
	{ key: 'Middle', value: 'middle' },
	{ key: 'High', value: 'high' }
];
