import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { logoutAction } from '../loading/logoutAction';
import { IUser, IUsers } from './types';

const initialState: IUser = {
	data: {
		roomId: '',
		firstName: '',
		lastName: '',
		position: '',
		avatar: '',
		isObserver: false,
		isAdmin: false,
		karma: 0,
		id: '',
		adminId: ''
	},
	users: {}
};

const userReducer = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserData: (state: IUser, action: PayloadAction<IUser>) => {
			state.data = action.payload.data;
			state.users = action.payload.users;
		},
		setUsers: (
			state: IUser,
			action: PayloadAction<{ users: { [key: string]: IUsers } }>
		) => {
			state.users = action.payload.users;
		},

		removeUser: (state: IUser, action: PayloadAction<{ userId: string }>) => {
			delete state.users[action.payload.userId];
		},

		setObserver: (state: IUser, action: PayloadAction<boolean>) => {
			state.data.isObserver = action.payload;
		}
	},

	extraReducers: (builder) => {
		builder.addCase(logoutAction, () => initialState);
	}
});

export const { setUserData, setUsers, removeUser, setObserver } =
	userReducer.actions;
export default userReducer.reducer;
