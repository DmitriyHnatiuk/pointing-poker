import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { logoutAction } from '../loading/logoutAction';
import { RatingType } from './type';

const initialState: Record<string, RatingType> = {};

type ResultStateType = typeof initialState;

const usersVoteSlice = createSlice({
	name: 'rating',
	initialState,
	reducers: {
		setUsersVote: (
			state: ResultStateType,
			action: PayloadAction<Record<string, RatingType>>
		) => action.payload,

		setUserVote: (
			state: ResultStateType,
			action: PayloadAction<{ userId: string; data: RatingType }>
		) => {
			state[action.payload.userId] = action.payload.data;
		},
		resetUsersVote: () => initialState
	},
	extraReducers: (builder) => builder.addCase(logoutAction, () => initialState)
});

export const { setUsersVote, resetUsersVote, setUserVote } =
	usersVoteSlice.actions;

export default usersVoteSlice.reducer;
