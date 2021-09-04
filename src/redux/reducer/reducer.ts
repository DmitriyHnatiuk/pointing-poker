const SET_VALUE = 'SET_VALUE';

const initialStore = { initValue: '' };

type StateType = typeof initialStore;
type ActionType = AC1Type;

const reducer = (state: StateType = initialStore, action: ActionType): StateType => {
	switch (action.type) {
		case SET_VALUE: {
			return { ...state };
		}
		default:
			return state;
	}
};
interface obj {
	value: string;
}

export const setDevActionCreation = (value: obj) => ({ type: SET_VALUE, value } as const);
type AC1Type = ReturnType<typeof setDevActionCreation>;

export default reducer;
