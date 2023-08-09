import { configureStore } from '@reduxjs/toolkit';
import {
	chatReducer,
	loadingReducer,
	modalReducer,
	planningReducer,
	resultReducer,
	userReducer,
	usersVoteReducer
} from './reducer';

export const store = configureStore({
	reducer: {
		modal: modalReducer,
		user: userReducer,
		chat: chatReducer,
		planning: planningReducer,
		result: resultReducer,
		usersVote: usersVoteReducer,
		loading: loadingReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
