import { RootState } from 'redux/store';
import { IUsersState } from './membersReducer/types';
import { ISPCardsState } from './storyPointCardsReducer/types';

export const getMembers = (state: RootState): IUsersState =>
	state.membersReducer;

export const getSPCards = (state: RootState): ISPCardsState =>
	state.storyPointCardsReducer;
