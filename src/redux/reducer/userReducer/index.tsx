import { ActionCreationArguments } from 'interfaces/commonComponents';
import { User } from './types';

export const SET_DATA = 'SET_DATA';
export const DELETE_USER = 'DELETE_USER';

const initialStore: User = {
	selectedCard: '',
	roomNumber: '',
	firstName: '',
	lastName: '',
	position: '',
	avatar: '',
	observer: false,
	isAdmin: false,
	karma: 0,
	id: '',
	login: false,
	users: [
		{
			selectedCard: '',
			roomNumber: 'string',
			observer: false,
			karma: 0,
			id: '1',
			firstName: 'Admin',
			lastName: 'Petrov',
			position: 'Senior JS Dev',
			isAdmin: true,
			login: false,
			avatar: `https://png.pngtree.com/png-clipart/20190924/original
				/pngtree-human-avatar-free-vector-png-image_4825373.jpg`
		},
		{
			selectedCard: '',
			roomNumber: 'string',
			observer: false,
			karma: 0,
			id: '2',
			firstName: 'Member_1',
			lastName: 'One',
			position: 'Junior JS Dev',
			isAdmin: false,
			login: false,
			avatar: 'https://pngimg.com/uploads/avatar/avatar_PNG41.png'
		},
		{
			selectedCard: '',
			roomNumber: 'string',
			observer: false,
			karma: 0,
			id: '3',
			firstName: 'Member_2',
			lastName: 'Two',
			position: 'Junior JS Dev',
			isAdmin: false,
			login: false,
			avatar: ''
		},
		{
			selectedCard: '',
			roomNumber: 'string',
			observer: false,
			karma: 0,
			id: '4',
			firstName: 'Member_3',
			lastName: 'Three',
			position: 'Junior JS Dev',
			isAdmin: false,
			login: false,
			avatar: ''
		}
	]
};

type StateType = typeof initialStore;

export type ActionType = AC1Type | AC2Type | AC3Type;

const userReducer = (
	state: StateType = initialStore,
	{ type, payload }: ActionType
): StateType => {
	switch (type) {
		case SET_DATA: {
			return {
				...state,
				...payload
			};
		}
		case DELETE_USER: {
			return {
				...state,
				users: state.users.filter((user) => user.id !== payload.id)
			};
		}

		default:
			return state;
	}
};

export const deleteUserActionCreation = (payload: ActionCreationArguments) =>
	({ type: DELETE_USER, payload } as const);

export const setUserDataActionCreation = (payload: ActionCreationArguments) =>
	({ type: SET_DATA, payload } as const);

export const resetUserDataActionCreation = () =>
	({ type: SET_DATA, payload: initialStore } as const);

type AC1Type = ReturnType<typeof deleteUserActionCreation>;
type AC2Type = ReturnType<typeof setUserDataActionCreation>;
type AC3Type = ReturnType<typeof resetUserDataActionCreation>;

export default userReducer;
