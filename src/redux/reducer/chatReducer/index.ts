import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IChatMessage } from 'src/interfaces/thunkTypes';

import { logoutAction } from '../loading/logoutAction';
import { ChatType } from './types';

const initialState: ChatType = {
	isOpenChat: false,
	messages: {}
};

const ChatReducer = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setSwitchChat: (state: ChatType) => {
			state.isOpenChat = !state.isOpenChat;
		},

		setCloseChat: (state: ChatType) => {
			state.isOpenChat = false;
		},

		addMessage: (state: ChatType, action: PayloadAction<IChatMessage>) => {
			state.messages[action.payload.id] = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(logoutAction, () => initialState);
	}
});

export const { setSwitchChat, setCloseChat, addMessage } = ChatReducer.actions;

export default ChatReducer.reducer;
