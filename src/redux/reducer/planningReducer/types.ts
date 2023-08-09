export interface IPlanning {
	isRunRound: boolean;
	isLoginOpen: boolean;
	activeIssueId: string;
	issues: { [key: string]: IssueType };
	cards: { [key: string]: PlayingCardType };
	timer: TimerSettingsType;
	settings: SettingsType;
}

export type SettingsType = {
	planningTitle: string;
	scoreType: string;
	isTimerNeeded: boolean;
	isRevertCard: boolean;
	typeCards: number;
	amountCard: number;
	playingCardsSet: keyof { [key in PlayingCardSetEnum]: any };
};

export type TimerSettingsType = {
	min: string;
	sec: string;
};

export type PlayingCardType = {
	cardId: string;
	score: string;
	isFirstCard?: boolean;
};

export enum PlayingCardSetEnum {
	fibonacciNumbers = 'Fibonacci numbers',
	degreeTwo = 'Degree two',
	linearSequence = 'Linear sequence'
}

export type IssueType = {
	id: string;
	title: string;
	priority: string;
	link: string;
};
