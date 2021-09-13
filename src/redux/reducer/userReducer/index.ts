import { IUser } from 'redux/reducer/userReducer/types';
import {
	UsersAction,
	IUsersState,
	RolesUsersEnum,
	UsersActionsEnum
} from './types';

const initialState: IUsersState = {
	members: [
		{
			id: 1,
			firstName: 'Admin',
			lastName: 'Petrov',
			job: 'Senior JS Dev',
			role: RolesUsersEnum.ADMIN,
			avatar: `https://png.pngtree.com/png-clipart/20190924/original
				/pngtree-human-avatar-free-vector-png-image_4825373.jpg`
		},
		{
			id: 2,
			firstName: 'Member_1',
			lastName: 'One',
			job: 'Junior JS Dev',
			role: RolesUsersEnum.REGULAR,
			avatar: 'https://pngimg.com/uploads/avatar/avatar_PNG41.png'
		},
		{
			id: 3,
			firstName: 'Member_2',
			lastName: 'Two',
			job: 'Junior JS Dev',
			role: RolesUsersEnum.REGULAR,
			avatar: ''
		},
		{
			id: 4,
			firstName: 'Member_3',
			lastName: 'Three',
			job: 'Junior JS Dev',
			role: RolesUsersEnum.REGULAR,
			avatar: ''
		}
	]
};

const userReducer = (
	state = initialState,
	action: UsersAction
): IUsersState => {
	switch (action.type) {
		case UsersActionsEnum.DELETE_USER: {
			return {
				...state,
				members: state.members.filter((user) => user.id !== action.payload.id)
			};
		}

		default:
			return state;
	}
};

export const deleteUser = (user: IUser): UsersAction => ({
	type: UsersActionsEnum.DELETE_USER,
	payload: user
});

export default userReducer;
