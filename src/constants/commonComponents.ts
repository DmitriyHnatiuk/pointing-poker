import { IGitHubItems } from 'interfaces/commonComponents';

export const RSS_HREF = 'https://rs.school';

export const GitHubItems: Array<IGitHubItems> = [
	{
		id: 1,
		href: 'https://github.com/DmitriyHnatiuk',
		name: 'dmitriyhnatiuk'
	},
	{
		id: 2,
		href: 'https://github.com/syleimanovsergey',
		name: 'syleimanovsergey'
	},
	{ id: 3, href: 'https://github.com/NiFroPP', name: 'nifropp' }
];

export enum btnValue {
	START = 'Start new game',
	CONNECT = 'Connect',
	CONFIRM = 'Confirm',
	CANCEL = 'Cancel',
	START_GAME = 'Start Game',
	STOP_GAME = 'Stop Game',
	RUN_ROUND = 'Run Round',
	RESTART_ROUND = 'Restart Round',
	NEXT_ISSUE = 'Next ISSUE',
	CANCEL_GAME = 'Cancel game',
	OBSERVER = 'observer',
	YES = 'Yes',
	NO = 'No',
	COPY = 'Copy',
	EXIT = 'Exit'
}

export const typeMessage = {
	ERROR: 'Error:',
	MESSAGE: 'Message:'
};
