export interface Game {
	userName: string;
	isAdmin: boolean;
	room: string;
	planningTitle: string;
	issues: Array<string>;
	scoreType: string;
	cards: PlayingCard[];
	timer: TimerSettings;
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

export enum SettingsActionEnum {
	EDIT_PLAYING_CARD = 'EDIT_PLAYING_CARD',
	DELETE_PLAYING_CARD = 'DELETE_PLAYING_CARD',
	ADD_PLAYING_CARD = 'ADD_PLAYING_CARD',
	SETTING_TIMER = 'SETTING_TIMER'
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

export type GameAction =
	| EditPlayingCardAction
	| DeletePlayingCardAction
	| AddPlayingCardAction
	| SettingTimerAction;
