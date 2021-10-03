import { IGitHubItems } from 'interfaces/commonComponents';
import cardBack1 from 'assets/images/CardBack/card_back_1.jpg';
import cardBack2 from 'assets/images/CardBack/card_back_2.jpg';
import cardBack3 from 'assets/images/CardBack/card_back_3.jpg';
import cardBack4 from 'assets/images/CardBack/card_back_4.jpg';
import cardBack5 from 'assets/images/CardBack/card_back_5.jpg';
import cardBack6 from 'assets/images/CardBack/card_back_6.jpg';
import cardBack7 from 'assets/images/CardBack/card_back_7.jpg';

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

export const imagesCardBack = [
	cardBack1,
	cardBack2,
	cardBack3,
	cardBack4,
	cardBack5,
	cardBack6,
	cardBack7
];
