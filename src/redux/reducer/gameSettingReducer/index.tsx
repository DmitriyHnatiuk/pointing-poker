import {
	Game,
	GameAction,
	GameData,
	Issue,
	IssueAction,
	PlayingCard,
	PlayingCardSetEnum,
	SettingsActionEnum,
	TimerSettings
} from './types';

const initialStore: Game = {
	isAdminAsPlayer: false,
	runRound: false,
	issues: [],
	scoreType: 'ST',
	timer: {
		min: '00',
		sec: '00',

		isActive: false
	},
	isTimer: false,
	cards: [],
	typeCards: 0,
	amountCard: 5,
	playingCardsSet: PlayingCardSetEnum.linearSequence,
	planningTitle: 'Add Planes'
};

type StateType = typeof initialStore;

const reducer = (
	state: StateType = initialStore,
	action: GameAction
): StateType => {
	switch (action.type) {
		case SettingsActionEnum.SET_GAME_DATA: {
			return {
				...state,
				...action.payload
			};
		}

		case SettingsActionEnum.RESET_GAME_DATA: {
			return {
				...state,
				...action.payload
			};
		}

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
				cards: state.cards.filter((card) => card.id !== action.payload.id),
				amountCard: state.amountCard - 1
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
						score: action.payload.score,
						count: action.payload.count
					}
				],
				amountCard: state.amountCard + 1
			};
		}

		case SettingsActionEnum.SET_PLAYING_CARD_SET: {
			return {
				...state,
				cards: action.payload
			};
		}

		case SettingsActionEnum.CHANGE_PLAYING_CARD_SET: {
			return {
				...state,
				playingCardsSet: action.payload
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
						active: action.payload.active,
						link: action.payload.link
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
				timer: { ...state.timer, ...action.payload }
			};
		}

		case SettingsActionEnum.IS_TIMER_ACTIVE: {
			return {
				...state,
				timer: { ...state.timer, isActive: action.payload }
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
				isAdminAsPlayer: action.payload
			};
		}

		case SettingsActionEnum.SET_SCORE_TYPE: {
			return {
				...state,
				scoreType: action.payload
			};
		}

		case SettingsActionEnum.CHANGE_TITLE: {
			return {
				...state,
				planningTitle: action.payload
			};
		}

		case SettingsActionEnum.SELECT_CARD_BACK: {
			return {
				...state,
				typeCards: action.payload
			};
		}

		default:
			return state;
	}
};

export const resetGameData = (): GameAction => ({
	type: SettingsActionEnum.RESET_GAME_DATA,
	payload: initialStore
});

export const setGameData = (state: GameData): GameAction => ({
	type: SettingsActionEnum.SET_GAME_DATA,
	payload: state
});

export const addIssue = (values: Issue): GameAction => ({
	type: SettingsActionEnum.ADD_ISSUE,
	payload: values
});

export const activeIssue = (issue: Issue): GameAction => ({
	type: SettingsActionEnum.ACTIVE_ISSUE,
	payload: issue
});

export const deleteIssue = (issue: IssueAction): GameAction => ({
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

export const activePlayingCardAction = (card: PlayingCard): GameAction => ({
	type: SettingsActionEnum.ACTIVE_PLAYING_CARD,
	payload: card
});

export const addPlayingCardAction = (
	newPlayingCard: PlayingCard
): GameAction => ({
	type: SettingsActionEnum.ADD_PLAYING_CARD,
	payload: newPlayingCard
});

export const setPlayingCardSetAction = (
	cardSet: PlayingCard[]
): GameAction => ({
	type: SettingsActionEnum.SET_PLAYING_CARD_SET,
	payload: cardSet
});

export const changePlayingCardSetAction = (cardSet: string): GameAction => ({
	type: SettingsActionEnum.CHANGE_PLAYING_CARD_SET,
	payload: cardSet
});

export const SetTimer = (timer: TimerSettings): GameAction => ({
	type: SettingsActionEnum.SETTING_TIMER,
	payload: timer
});

export const SetIsTimer = (): GameAction => ({
	type: SettingsActionEnum.TOGGLE_IS_TIMER
});

export const SetIsAdminAsPlayer = (value: boolean): GameAction => ({
	type: SettingsActionEnum.TOGGLE_IS_ADMIN_PLAYER,
	payload: value
});

export const SetScoreType = (storyType: string): GameAction => ({
	type: SettingsActionEnum.SET_SCORE_TYPE,
	payload: storyType
});

export const SetSelectCardBack = (selectedCard: number): GameAction => ({
	type: SettingsActionEnum.SELECT_CARD_BACK,
	payload: selectedCard
});

export const SetActiveTimer = (active: boolean): GameAction => ({
	type: SettingsActionEnum.IS_TIMER_ACTIVE,
	payload: active
});

export const setChangeTitle = (title: string): GameAction => ({
	type: SettingsActionEnum.CHANGE_TITLE,
	payload: title
});

export default reducer;
