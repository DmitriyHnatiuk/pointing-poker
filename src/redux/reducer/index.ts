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
type ActionType = AC1Type | AC2Type | AC3Type;

const reducer = (
	state: StateType = initialStore,
	action: ActionType
): StateType => {
	switch (action.type) {
		case SET_NAME: {
			return { ...state, userName: action.payload };
		}
		case SET_ROOM: {
			return { ...state, room: action.payload };
		}
		case SET_ADMIN: {
			return { ...state, room: action.payload };
		}

		default:
			return state;
	}
};

export const setNameActionCreation = (value: string) =>
	({ type: SET_NAME, payload: value } as const);

export const setRoomActionCreation = (value: string) =>
	({ type: SET_ROOM, payload: value } as const);

export const setAdminActionCreation = (value: string) =>
	({ type: SET_ADMIN, payload: value } as const);

type AC1Type = ReturnType<typeof setNameActionCreation>;
type AC2Type = ReturnType<typeof setRoomActionCreation>;
type AC3Type = ReturnType<typeof setAdminActionCreation>;

export default reducer;
