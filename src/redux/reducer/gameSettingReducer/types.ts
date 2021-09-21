export interface Game {
	userName: string;
	isAdmin: boolean;
	room: string;
	planningTitle: string;
	issues: Array<string>;
	scoreType: string;
	cards: PlayingCard[];
}

export interface PlayingCard {
	id: number;
	score: string;
	isFirstCard?: boolean;
}

export enum SettingsActionEnum {
	EDIT_PLAYING_CARD = 'EDIT_PLAYING_CARD',
	DELETE_PLAYING_CARD = 'DELETE_PLAYING_CARD',
	ADD_PLAYING_CARD = 'ADD_PLAYING_CARD'
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

export type GameAction =
	| EditPlayingCardAction
	| DeletePlayingCardAction
	| AddPlayingCardAction;
