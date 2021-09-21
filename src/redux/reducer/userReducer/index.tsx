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
			avatar: ''
		}
	]
};

type StateType = typeof initialStore;

type ActionType = AC1Type | AC2Type;

const userReducer = (
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
		case DELETE_USER: {
			return {
				...state,
				users: state.users.filter((user) => user.id !== action.payload.id)
			};
		}

		default:
			return state;
	}
};

export const deleteUserActionCreation = (value: ActionCreationArguments) =>
	({ type: DELETE_USER, payload: value } as const);

export const setUserDataActionCreation = (value: ActionCreationArguments) =>
	({ type: SET_DATA, payload: value } as const);

type AC1Type = ReturnType<typeof deleteUserActionCreation>;
type AC2Type = ReturnType<typeof setUserDataActionCreation>;

export default userReducer;
