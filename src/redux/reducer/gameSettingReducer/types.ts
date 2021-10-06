export interface Game {
	isAdminAsPlayer: boolean;
	planningTitle: string;
	issues: Issue[];
	scoreType: string;
	cards: PlayingCard[];
	typeCards: number;
	amountCard: number;
	playingCardsSet: string;
	timer: TimerSettings;
	isTimer: boolean;
	runRound: boolean;
}

export interface GameData {
	isAdminAsPlayer?: boolean;
	planningTitle?: string;
	issues?: Issue[];
	scoreType?: string;
	cards?: PlayingCard[];
	playingCardsSet?: string;
	timer?: TimerSettings;
	isTimer?: boolean;
	runRound?: boolean;
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
	active?: boolean;
	count: number;
}

export enum PlayingCardSetEnum {
	fibonacciNumbers = 'Fibonacci numbers',
	degreeTwo = 'Degree two',
	linearSequence = 'Linear sequence'
}

export interface Issue {
	id: number;
	title: string;
	priority: string;
	active: boolean;
	link: string;
}

export interface IssueAction {
	id: number;
}

export enum SettingsActionEnum {
	EDIT_PLAYING_CARD = 'EDIT_PLAYING_CARD',
	DELETE_PLAYING_CARD = 'DELETE_PLAYING_CARD',
	ADD_PLAYING_CARD = 'ADD_PLAYING_CARD',
	SET_PLAYING_CARD_SET = 'SET_PLAYING_CARD_SET',
	CHANGE_PLAYING_CARD_SET = 'CHANGE_PLAYING_CARD_SET',
	SETTING_TIMER = 'SETTING_TIMER',
	ADD_ISSUE = 'ADD_ISSUE',
	DELETE_ISSUE = 'DELETE_ISSUE',
	TOGGLE_IS_TIMER = 'TOGGLE_IS_TIMER',
	TOGGLE_IS_ADMIN_PLAYER = 'TOGGLE_IS_ADMIN_PLAYER',
	SET_SCORE_TYPE = 'SET_SCORE_TYPE',
	IS_TIMER_ACTIVE = 'IS_TIMER_ACTIVE',
	ACTIVE_ISSUE = 'ACTIVE_ISSUE',
	ACTIVE_PLAYING_CARD = 'ACTIVE_PLAYING_CARD',
	SET_GAME_DATA = 'SET_GAME_DATA',
	RESET_GAME_DATA = 'RESET_GAME_DATA',
	CHANGE_TITLE = 'CHANGE_TITLE',
	SELECT_CARD_BACK = 'SELECT_CARD_BACK'
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

interface SetPlayingCardSetAction {
	type: SettingsActionEnum.SET_PLAYING_CARD_SET;
	payload: PlayingCard[];
}

interface SetIsTimer {
	type: SettingsActionEnum.TOGGLE_IS_TIMER;
}

interface ChangePlayingCardSetAction {
	type: SettingsActionEnum.CHANGE_PLAYING_CARD_SET;
	payload: string;
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
	payload: IssueAction;
}

interface ToggleIsTimerAction {
	type: SettingsActionEnum.TOGGLE_IS_TIMER;
}

interface SetIsAdminAsPlayer {
	type: SettingsActionEnum.TOGGLE_IS_ADMIN_PLAYER;
	payload: boolean;
}

interface SetScoreType {
	type: SettingsActionEnum.SET_SCORE_TYPE;
	payload: string;
}

interface SetGameData {
	type: SettingsActionEnum.SET_GAME_DATA;
	payload: GameData;
}

interface ResetGameData {
	type: SettingsActionEnum.RESET_GAME_DATA;
	payload: GameData;
}

interface IsTimerAction {
	type: SettingsActionEnum.IS_TIMER_ACTIVE;
	payload: boolean;
}

interface ChangeTitle {
	type: SettingsActionEnum.CHANGE_TITLE;
	payload: string;
}
interface SelectCardBackAction {
	type: SettingsActionEnum.SELECT_CARD_BACK;
	payload: number;
}

export type GameAction =
	| EditPlayingCardAction
	| DeletePlayingCardAction
	| AddPlayingCardAction
	| SetPlayingCardSetAction
	| ChangePlayingCardSetAction
	| SettingTimerAction
	| AddIssueAction
	| DeleteIssueAction
	| ToggleIsTimerAction
	| IsTimerAction
	| ActiveIssueAction
	| ActivePlayingCardAction
	| SetScoreType
	| SetIsTimer
	| SetIsAdminAsPlayer
	| SetGameData
	| ChangeTitle
	| SelectCardBackAction
	| ResetGameData;
