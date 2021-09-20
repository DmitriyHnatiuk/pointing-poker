import { ISPCard, ISPCardsState, SPAction, SPActionEnum } from './types';

const initialState: ISPCardsState = {
	SPCards: [
		{
			id: 1,
			score: 'unknown',
			isScoreEdit: false,
			type: 'dd',
			isGame: false
		},
		{
			id: 2,
			score: '1',
			isScoreEdit: false,
			type: 'SP',
			isGame: false
		},
		{
			id: 3,
			score: '11',
			isScoreEdit: false,
			type: 'SP',
			isGame: false
		}
	]
};

const storyPointCardsReducer = (
	state = initialState,
	action: SPAction
): ISPCardsState => {
	switch (action.type) {
		case SPActionEnum.EDIT_CARD: {
			return {
				...state,
				SPCards: state.SPCards.map((card) => {
					if (card.id === action.payload.card.id) {
						return { ...card, score: action.payload.score };
					}
					return card;
				})
			};
		}

		case SPActionEnum.TOGGLE_EDIT_SCORE: {
			return {
				...state,
				SPCards: state.SPCards.map((card) => {
					if (card.id === action.payload.id) {
						return { ...card, isScoreEdit: true };
					}
					return card;
				})
			};
		}

		default:
			return state;
	}
};

export const scoreEdit = (card: ISPCard, score: string): SPAction => ({
	type: SPActionEnum.EDIT_CARD,
	payload: { card, score }
});

export const toggleScoreEdit = (card: ISPCard): SPAction => ({
	type: SPActionEnum.TOGGLE_EDIT_SCORE,
	payload: card
});

export default storyPointCardsReducer;
