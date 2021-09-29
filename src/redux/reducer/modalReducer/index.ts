import { Modal } from './types';

export const SET_MODAL = 'SET_MODAL';

const initialStore: Modal = {
	openModal: false,
	type: 'REGISTRATION',
	message: '',
	player: '',
	playerKick: '',
	id: '',
	error: false,
	vote: true
};

type StateType = typeof initialStore;

export type modalActionType = AC1Type | AC2Type;

const modalReducer = (
	state: StateType = initialStore,
	{ type, payload }: modalActionType
): StateType => {
	switch (type) {
		case SET_MODAL: {
			return {
				...state,
				...payload
			};
		}

		default:
			return state;
	}
};

export const deleteModalActionCreation = () =>
	({ type: SET_MODAL, payload: initialStore } as const);

export const setModalDataActionCreation = (payload: Modal) =>
	({ type: SET_MODAL, payload } as const);

type AC1Type = ReturnType<typeof deleteModalActionCreation>;
type AC2Type = ReturnType<typeof setModalDataActionCreation>;

export default modalReducer;
