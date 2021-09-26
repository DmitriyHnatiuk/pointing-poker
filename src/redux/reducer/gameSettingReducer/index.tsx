import { ActionCreationArguments } from 'interfaces/commonComponents';
import {
	Game,
	GameAction,
	PlayingCard,
	SettingsActionEnum,
	TimerSettings
} from './types';

export const SET_DATA = 'SET_DATA';
export const SET_NAME = 'SET_NAME';
export const SET_ROOM = 'SET_ROOM';
export const SET_ADMIN = 'SET_ADMIN';

const initialStore: Game = {
	userName: '',
	isAdmin: false,
	room: '',
	issues: ['Issues 545'],
	scoreType: 'SP',
	timer: {
		min: '00',
		sec: '00'
	},
	cards: [
		{
			id: 1,
			score: 'unknown',
			isFirstCard: true
		},
		{
			id: 2,
			score: '1'
		},
		{
			id: 3,
			score: '11'
		}
	],
	planningTitle: 'Title & Planes'
};

type StateType = typeof initialStore;

const reducer = (
	state: StateType = initialStore,
	action: GameAction
): StateType => {
	switch (action.type) {
		case SettingsActionEnum.EDIT_PLAYING_CARD: {
			return {
				...state,
				cards: state.cards.map((card) => {
					if (card.id === action.payload.card.id) {
						return { ...card, score: action.payload.score };
					}

					return card;
				})
			};
		}

		case SettingsActionEnum.DELETE_PLAYING_CARD: {
			return {
				...state,
				cards: state.cards.filter((card) => card.id !== action.payload.id)
			};
		}

		case SettingsActionEnum.ADD_PLAYING_CARD: {
			return {
				...state,
				cards: [...state.cards, action.payload]
			};
		}

		case SettingsActionEnum.SETTING_TIMER: {
			return {
				...state,
				timer: action.payload
			};
		}

		default:
			return state;
	}
};

export const setDataActionCreation = (value: ActionCreationArguments) =>
	({ type: SET_DATA, payload: value } as const);
export const editPlayingCard = (
	card: PlayingCard,
	score: string
): GameAction => ({
	type: SettingsActionEnum.EDIT_PLAYING_CARD,
	payload: { card, score }
});

export const deletePlayingCard = (card: PlayingCard): GameAction => ({
	type: SettingsActionEnum.DELETE_PLAYING_CARD,
	payload: card
});

export const addPlayingCard = (): GameAction => ({
	type: SettingsActionEnum.ADD_PLAYING_CARD,
	payload: { id: 5, score: '55' }
});

export const setTimer = (timer: TimerSettings): GameAction => ({
	type: SettingsActionEnum.SETTING_TIMER,
	payload: timer
});

export default reducer;
