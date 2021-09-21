import { ActionCreationArguments } from 'interfaces/commonComponents';

export const SET_DATA = 'SET_DATA';
export const SET_NAME = 'SET_NAME';
export const SET_ROOM = 'SET_ROOM';
export const SET_ADMIN = 'SET_ADMIN';

const initialStore: {
	userName: string;
	isAdmin: boolean;
	room: string;
	planningTitle: string;
	issues: Array<string>;
	cards: Array<string>;
} = {
	userName: '',
	isAdmin: false,
	room: '',
	issues: ['Issues 545'],
	cards: [],
	planningTitle: 'Title & Planes'
};

type StateType = typeof initialStore;

type ActionType = AC1Type;

const reducer = (
	state: StateType = initialStore,
	action: ActionType
): StateType => {
	switch (action.type) {
		case SET_DATA: {
			return {
				...state,
				...action.payload
			};
		}

		default:
			return state;
	}
};

export const setDataActionCreation = (value: ActionCreationArguments) =>
	({ type: SET_DATA, payload: value } as const);

type AC1Type = ReturnType<typeof setDataActionCreation>;

export default reducer;
