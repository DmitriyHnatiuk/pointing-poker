import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { GetUsersType, IData, IUsers, UsersDataType } from './types';

export const selectUserData = (state: RootState): IData => state.user.data;

const selectUsers = (state: RootState): Record<string, IUsers> =>
	state.user.users;

export const selectSortedUsers = createSelector(
	selectUsers,
	(users): GetUsersType => {
		return Object.values(users).reduce(
			(acc: GetUsersType, user: IUsers) =>
				user.isAdmin
					? { ...acc, admin: user }
					: { ...acc, users: [...acc.users, user] },
			{ users: [], admin: null }
		);
	}
);

export const selectUsersData = createSelector(selectUsers, (users) =>
	Object.values(users).reduce(
		(acc: UsersDataType, user: IUsers): UsersDataType => {
			if (user.isAdmin) return acc;

			return user.isObserver
				? { ...acc, observers: [...acc.observers, user] }
				: { ...acc, players: [...acc.players, user] };
		},
		{ players: [], observers: [] }
	)
);
