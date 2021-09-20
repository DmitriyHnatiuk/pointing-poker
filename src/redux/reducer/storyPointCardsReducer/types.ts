export interface ISPCard {
	id: number;
	score: string;
	isScoreEdit: boolean;
	type: string;
	isGame: boolean;
}

export interface ISPCardsState {
	SPCards: ISPCard[];
}

export enum SPActionEnum {
	EDIT_CARD = 'EDIT_CARD',
	TOGGLE_EDIT_SCORE = 'TOGGLE_EDIT_SCORE'
}

interface IScoreEditAction {
	type: SPActionEnum.EDIT_CARD;
	payload: { card: ISPCard; score: string };
}

interface toggleScoreEdit {
	type: SPActionEnum.TOGGLE_EDIT_SCORE;
	payload: ISPCard;
}

export type SPAction = IScoreEditAction | toggleScoreEdit;
