import {
	Game,
	GameAction,
	Issue,
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
	isAdminAsPlayer: false,
	room: '',
	issues: [
		{ id: 1, title: 'Issue_1', priority: 'LOW priority', active: false }
	],
	scoreType: 'ST',
	timer: {
		min: '00',
		sec: '00'
	},
	isTimer: false,
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

		case SettingsActionEnum.ACTIVE_PLAYING_CARD: {
			return {
				...state,
				cards: state.cards.map((card) => {
					const element = card;
					element.active = element === action.payload;
					return element;
				})
			};
		}

		case SettingsActionEnum.ADD_PLAYING_CARD: {
			return {
				...state,
				cards: [
					...state.cards,
					{
						id:
							state.cards.length === 0
								? 1
								: state.cards[state.cards.length - 1].id + 1,
						score: action.payload.score
					}
				]
			};
		}

		case SettingsActionEnum.ADD_ISSUE: {
			return {
				...state,
				issues: [
					...state.issues,
					{
						id:
							state.issues.length === 0
								? 1
								: state.issues[state.issues.length - 1].id + 1,
						title: action.payload.title,
						priority: action.payload.priority,
						active: action.payload.active
					}
				]
			};
		}

		case SettingsActionEnum.DELETE_ISSUE: {
			return {
				...state,
				issues: state.issues.filter((issue) => issue.id !== action.payload.id)
			};
		}

		case SettingsActionEnum.ACTIVE_ISSUE: {
			return {
				...state,
				issues: state.issues.map((issue) => {
					const element = issue;
					element.active = element === action.payload;
					return element;
				})
			};
		}

		case SettingsActionEnum.SETTING_TIMER: {
			return {
				...state,
				timer: action.payload
			};
		}

		case SettingsActionEnum.TOGGLE_IS_TIMER: {
			return {
				...state,
				isTimer: !state.isTimer
			};
		}

		case SettingsActionEnum.TOGGLE_IS_ADMIN_PLAYER: {
			return {
				...state,
				isAdminAsPlayer: !state.isAdminAsPlayer
			};
		}

		case SettingsActionEnum.SET_SCORE_TYPE: {
			return {
				...state,
				scoreType: action.payload
			};
		}

		default:
			return state;
	}
};

export const addIssue = (): GameAction => ({
	type: SettingsActionEnum.ADD_ISSUE,
	payload: { id: 3, title: 'Issue_3', priority: 'LOW priority', active: false }
});

export const activeIssue = (issue: Issue): GameAction => ({
	type: SettingsActionEnum.ACTIVE_ISSUE,
	payload: issue
});

export const deleteIssue = (issue: Issue): GameAction => ({
	type: SettingsActionEnum.DELETE_ISSUE,
	payload: issue
});

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

export const activePlayingCard = (card: PlayingCard): GameAction => ({
	type: SettingsActionEnum.ACTIVE_PLAYING_CARD,
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

export const setIsTimer = (): GameAction => ({
	type: SettingsActionEnum.TOGGLE_IS_TIMER
});

export const setIsAdminAsPlayerIsTimer = (): GameAction => ({
	type: SettingsActionEnum.TOGGLE_IS_ADMIN_PLAYER
});

export const setScoreType = (storyType: string): GameAction => ({
	type: SettingsActionEnum.SET_SCORE_TYPE,
	payload: storyType
});

export default reducer;
