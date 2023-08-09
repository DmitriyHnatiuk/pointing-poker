import { IChatMessage } from 'src/interfaces/thunkTypes';

import { RootState } from '../../store';

export const selectChatStatus = (state: RootState): boolean =>
	state.chat.isOpenChat;

export const selectChatMessages = (
	state: RootState
): Record<string, IChatMessage> => state.chat.messages;
