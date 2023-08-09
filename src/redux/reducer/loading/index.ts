import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { logoutAction } from './logoutAction';

const initialState = {
	isLoading: false
};

export const {
	reducer: loadingReducer,
	actions: { setLoading }
} = createSlice({
	name: 'loading',
	initialState,
	reducers: {
		setLoading: (
			state: typeof initialState,
			action: PayloadAction<boolean>
		) => {
			state.isLoading = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(logoutAction, () => initialState);
	}
});
