export interface Game {
	userName: string;
	isAdmin: boolean;
	isAdminAsPlayer: boolean;
	room: string;
	planningTitle: string;
	issues: Issue[];
	scoreType: string;
	cards: PlayingCard[];
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
	SETTING_TIMER = 'SETTING_TIMER',
	ADD_ISSUE = 'ADD_ISSUE',
	DELETE_ISSUE = 'DELETE_ISSUE',
	TOGGLE_IS_TIMER = 'TOGGLE_IS_TIMER',
	TOGGLE_IS_ADMIN_PLAYER = 'TOGGLE_IS_ADMIN_PLAYER',
	SET_SCORE_TYPE = 'SET_SCORE_TYPE',
	IS_TIMER_ACTIVE = 'IS_TIMER_ACTIVE',
	SET_DATA = 'SET_DATA'
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
	| SettingTimerAction
	| AddIssueAction
	| DeleteIssueAction
	| ToggleIsTimerAction
	| ToggleIsAdminAsPlayerAction
	| SetScoreType
	| IsTimerAction
	| setDataActionCreation;
