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
}

export interface PlayingCard {
	id: number;
	score: string;
	isFirstCard?: boolean;
	active?: boolean;
}

export interface Issue {
	id: number;
	title: string;
	priority: string;
	active: boolean;
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
	ACTIVE_ISSUE = 'ACTIVE_ISSUE',
	ACTIVE_PLAYING_CARD = 'ACTIVE_PLAYING_CARD'
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
	| ActiveIssueAction
	| ActivePlayingCardAction;
