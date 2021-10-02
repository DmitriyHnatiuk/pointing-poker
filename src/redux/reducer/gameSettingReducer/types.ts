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
	isActive?: boolean;
}

export interface PlayingCard {
	id: number;
	score: string;
	isFirstCard?: boolean;
	active?: boolean;
	count: number;
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
	active?: boolean;
	link: string;
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
	SET_SCORE_TYPE = 'SET_SCORE_TYPE',
	IS_TIMER_ACTIVE = 'IS_TIMER_ACTIVE',
	SET_DATA = 'SET_DATA'
	SET_SCORE_TYPE = 'SET_SCORE_TYPE',
	ACTIVE_ISSUE = 'ACTIVE_ISSUE',
	ACTIVE_PLAYING_CARD = 'ACTIVE_PLAYING_CARD',
	SET_GAME_DATA = 'SET_GAME_DATA'
}

interface EditPlayingCardAction {
	type: SettingsActionEnum.EDIT_PLAYING_CARD;
	payload: { card: PlayingCard; score: string };
}

interface DeletePlayingCardAction {
	type: SettingsActionEnum.DELETE_PLAYING_CARD;
	payload: PlayingCard;
}

interface ActivePlayingCardAction {
	type: SettingsActionEnum.ACTIVE_PLAYING_CARD;
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

interface ActiveIssueAction {
	type: SettingsActionEnum.ACTIVE_ISSUE;
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

interface SetGameData {
	type: SettingsActionEnum.SET_GAME_DATA;
	payload: Game;
}

interface IsTimerAction {
	type: SettingsActionEnum.IS_TIMER_ACTIVE;
	payload: boolean;
}

export interface obj {
	userName?: string;
	isAdmin?: boolean;
	isAdminAsPlayer?: boolean;
	room?: string;
	planningTitle?: string;
	issues?: Issue[];
	scoreType?: string;
	cards?: PlayingCard[];
	timer?: TimerSettings;
	isTimer?: boolean;
}
interface setDataActionCreation {
	type: SettingsActionEnum.SET_DATA;
	payload: obj;
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
	| SetScoreType
	| IsTimerAction
	| setDataActionCreation;
	| ActiveIssueAction
	| ActivePlayingCardAction
	| SetScoreType
	| SetGameData;
