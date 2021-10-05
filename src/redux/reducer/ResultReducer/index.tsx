import { ResultInterface } from 'interfaces/commonComponents';
import { Result } from './types';

export const SET_RESULT_DATA = 'SET_RESULT_DATA';

const initialStore: Result = {
	result: [
		{
			id: '',
			title: '',
			priority: '',
			link: '',
			active: false,
			cards: []
		}
	]
};

export type StateType = typeof initialStore;

export type ResultActionType = AC1Type | AC2Type;

const resultReducer = (
	state: StateType = initialStore,
	{ type, payload }: ResultActionType
): StateType => {
	switch (type) {
		case SET_RESULT_DATA: {
			return { ...state, ...payload };
		}

		default:
			return state;
	}
};

export const setResultDataActionCreation = (payload: ResultInterface) =>
	({ type: SET_RESULT_DATA, payload } as const);

export const resetResultDataActionCreation = () =>
	({ type: SET_RESULT_DATA, payload: initialStore } as const);

type AC1Type = ReturnType<typeof setResultDataActionCreation>;
type AC2Type = ReturnType<typeof resetResultDataActionCreation>;

export default resultReducer;
