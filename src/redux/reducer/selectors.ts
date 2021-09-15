import { RootState } from 'redux/store';
import { IUsersState } from './membersReducer/types';

export const getMembers = (state: RootState): IUsersState =>
	state.membersReducer;
