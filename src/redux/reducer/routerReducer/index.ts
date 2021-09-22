import { Rout } from './types';

export const SET_ROUTER = 'SET_ROUTER';
export const DELETE_ROUTER = 'DELETE_ROUTER';

const initialStore: Rout = {
	path: ''
};

type StateType = typeof initialStore;

export type routerActionType = AC1Type | AC2Type;

const userReducer = (
	state: StateType = initialStore,
	{ type, payload }: routerActionType
): StateType => {
	switch (type) {
		case SET_ROUTER: {
			return {
				...state,
				path: payload
			};
		}

		default:
			return state;
	}
};

export const deleteRouterActionCreation = () =>
	({ type: SET_ROUTER, payload: '' } as const);

export const setRouterDataActionCreation = (payload: string) =>
	({ type: SET_ROUTER, payload } as const);

type AC1Type = ReturnType<typeof deleteRouterActionCreation>;
type AC2Type = ReturnType<typeof setRouterDataActionCreation>;

export default userReducer;
