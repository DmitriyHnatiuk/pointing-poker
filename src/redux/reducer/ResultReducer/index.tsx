import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { logoutAction } from '../loading/logoutAction';
import { ResultType } from './types';

const initialState: ResultType = {};

type ResultStateType = typeof initialState;

const resultSlice = createSlice({
	name: 'result',
	initialState,
	reducers: {
		setResult: (state: ResultStateType, action: PayloadAction<ResultType>) =>
			action.payload
	},
	extraReducers: (builder) => {
		builder.addCase(logoutAction, () => initialState);
	}
});

export const { setResult } = resultSlice.actions;

export default resultSlice.reducer;
