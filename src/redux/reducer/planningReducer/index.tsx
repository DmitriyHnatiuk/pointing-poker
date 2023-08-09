import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getLinearCards } from '../../../utils/getPlayingCards';
import { logoutAction } from '../loading/logoutAction';
import {
	IPlanning,
	IssueType,
	PlayingCardSetEnum,
	PlayingCardType,
	TimerSettingsType
} from './types';

const initialState: IPlanning = {
	isRunRound: false,
	isLoginOpen: false,
	activeIssueId: '',
	issues: {},

	timer: {
		min: '00',
		sec: '00'
	},
	settings: {
		scoreType: 'ST',
		isTimerNeeded: false,
		isRevertCard: false,
		typeCards: 0,
		amountCard: 5,
		playingCardsSet: PlayingCardSetEnum.linearSequence,
		planningTitle: 'Set planning name'
	},
	cards: getLinearCards(5)
};

type PlanningStateType = typeof initialState;

const planningSlice = createSlice({
	name: 'planning',
	initialState,
	reducers: {
		editPlayingCard: (
			state: PlanningStateType,
			action: PayloadAction<{ card: PlayingCardType; score: string }>
		) => {
			if (state.cards[action.payload.card.cardId]) {
				state.cards[action.payload.card.cardId].score = action.payload.score;
			}
		},

		setSelectCardBack: (
			state: PlanningStateType,
			action: PayloadAction<number>
		) => {
			state.settings.typeCards = action.payload;
		},

		setActiveIssue: (
			state: PlanningStateType,
			action: PayloadAction<{ issueId: string }>
		) => {
			state.activeIssueId = action.payload.issueId;
		},

		setChangeTitle: (
			state: PlanningStateType,
			action: PayloadAction<string>
		) => {
			state.settings.planningTitle = action.payload;
		},

		deletePlayingCard: (
			state: PlanningStateType,
			action: PayloadAction<{ id: string }>
		) => {
			const { [action.payload.id]: card, ...cards } = state.cards;
			state.cards = cards;
			state.settings.amountCard -= 1;
		},

		setTimer: (
			state: PlanningStateType,
			action: PayloadAction<{ timer: TimerSettingsType }>
		) => {
			state.timer = { ...state.timer, ...action.payload.timer };
		},

		setPlayingCard: (
			state: PlanningStateType,
			action: PayloadAction<Record<string, PlayingCardType>>
		) => {
			state.cards = action.payload;
		},

		addPlayingCard: (
			state: PlanningStateType,
			action: PayloadAction<{ newCard: PlayingCardType }>
		) => {
			state.cards[action.payload.newCard.cardId] = action.payload.newCard;
			state.settings.amountCard = Object.keys(state.cards).filter(
				(card) => !state.cards[card].isFirstCard
			).length;
		},

		switchIsTimerNeeded: (state: PlanningStateType) => {
			state.settings.isTimerNeeded = !state.settings.isTimerNeeded;
		},

		switchIsRevertCard: (state: PlanningStateType) => {
			state.settings.isRevertCard = !state.settings.isRevertCard;
		},

		setScoreType: (state: PlanningStateType, action: PayloadAction<string>) => {
			state.settings.scoreType = action.payload;
		},

		changePlayingCard: (
			state: PlanningStateType,
			action: PayloadAction<keyof { [key in PlayingCardSetEnum]: any }>
		) => {
			state.settings.playingCardsSet = action.payload;
		},

		addIssue: (state: PlanningStateType, action: PayloadAction<IssueType>) => {
			state.issues[action.payload.id] = action.payload;
		},

		setPlanningData: (
			state: PlanningStateType,
			action: PayloadAction<Partial<PlanningStateType>>
		) => ({
			...state,
			...action.payload
		}),

		setRunRoundStatus: (
			state: PlanningStateType,
			action: PayloadAction<{ isRunRound: boolean; timer: TimerSettingsType }>
		) => {
			state.isRunRound = action.payload.isRunRound;
			state.timer = action.payload.timer;
		},

		deleteIssue: (
			state: PlanningStateType,
			action: PayloadAction<{ id: string }>
		) => {
			delete state.issues[action.payload.id];
		}
	},

	extraReducers: (builder) => {
		builder.addCase(logoutAction, () => initialState);
	}
});

export const {
	setPlanningData,
	editPlayingCard,
	setSelectCardBack,
	setActiveIssue,
	setChangeTitle,
	deletePlayingCard,
	setTimer,
	setPlayingCard,
	addPlayingCard,
	switchIsTimerNeeded,
	switchIsRevertCard,
	setScoreType,
	changePlayingCard,
	addIssue,
	deleteIssue,
	setRunRoundStatus
} = planningSlice.actions;

export default planningSlice.reducer;
