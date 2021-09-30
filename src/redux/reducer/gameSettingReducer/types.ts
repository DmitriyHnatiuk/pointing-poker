export interface Game {
	userName: string;
	isAdmin: boolean;
	isAdminAsPlayer: boolean;
	room: string;
	planningTitle: string;
	issues: Issue[];
	scoreType: string;
	cards: PlayingCard[];
	playingCardsSet: string;
	timer: TimerSettings;
	isTimer: boolean;
}

export interface TimerSettings {
	min: string;
	sec: string;
}

export interface PlayingCard {
	id: number;
	score: string;
	isFirstCard?: boolean;
}

export enum PlayingCardSetEnum {
	fibonacciNumbers = 'Fibonacci numbers',
	degreeTwo = 'Degree two',
	linearSequence = 'Linear sequence'
}

export interface Issue {
	id: number;
	title: string;
	priority: string;
}

export enum SettingsActionEnum {
	EDIT_PLAYING_CARD = 'EDIT_PLAYING_CARD',
	DELETE_PLAYING_CARD = 'DELETE_PLAYING_CARD',
	ADD_PLAYING_CARD = 'ADD_PLAYING_CARD',
	SET_PLAYING_CARD_SET = 'SET_PLAYING_CARD_SET',
	CHANGE_PLAYING_CARD_SET = 'CHANGE_PLAYING_CARD_SET',
	SETTING_TIMER = 'SETTING_TIMER',
	ADD_ISSUE = 'ADD_ISSUE',
	DELETE_ISSUE = 'DELETE_ISSUE',
	TOGGLE_IS_TIMER = 'TOGGLE_IS_TIMER',
	TOGGLE_IS_ADMIN_PLAYER = 'TOGGLE_IS_ADMIN_PLAYER',
	SET_SCORE_TYPE = 'SET_SCORE_TYPE'
}

interface EditPlayingCardAction {
	type: SettingsActionEnum.EDIT_PLAYING_CARD;
	payload: { card: PlayingCard; score: string };
}

interface DeletePlayingCardAction {
	type: SettingsActionEnum.DELETE_PLAYING_CARD;
	payload: PlayingCard;
}

interface AddPlayingCardAction {
	type: SettingsActionEnum.ADD_PLAYING_CARD;
	payload: PlayingCard;
}

interface SetPlayingCardSetAction {
	type: SettingsActionEnum.SET_PLAYING_CARD_SET;
	payload: PlayingCard[];
}

interface ChangePlayingCardSetAction {
	type: SettingsActionEnum.CHANGE_PLAYING_CARD_SET;
	payload: string;
}

interface SettingTimerAction {
	type: SettingsActionEnum.SETTING_TIMER;
	payload: TimerSettings;
}

interface AddIssueAction {
	type: SettingsActionEnum.ADD_ISSUE;
	payload: Issue;
}

interface DeleteIssueAction {
	type: SettingsActionEnum.DELETE_ISSUE;
	payload: Issue;
}

interface ToggleIsTimerAction {
	type: SettingsActionEnum.TOGGLE_IS_TIMER;
}

interface ToggleIsAdminAsPlayerAction {
	type: SettingsActionEnum.TOGGLE_IS_ADMIN_PLAYER;
}

interface SetScoreType {
	type: SettingsActionEnum.SET_SCORE_TYPE;
	payload: string;
}

export type GameAction =
	| EditPlayingCardAction
	| DeletePlayingCardAction
	| AddPlayingCardAction
	| SetPlayingCardSetAction
	| ChangePlayingCardSetAction
	| SettingTimerAction
	| AddIssueAction
	| DeleteIssueAction
	| ToggleIsTimerAction
	| ToggleIsAdminAsPlayerAction
	| SetScoreType;
