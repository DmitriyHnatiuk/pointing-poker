import { interfaceChatMessage } from 'interfaces/commonChat';
import { ChatAction, ChatActionEnum, ChatReducer } from './types';

const initialState: ChatReducer = {
	open: false,
	messages: []
};

const reducer = (
	state: ChatReducer = initialState,
	actions: ChatAction
): ChatReducer => {
	switch (actions.type) {
		case ChatActionEnum.openChat: {
			return {
				...state,
				open: actions.payload
			};
		}
		case ChatActionEnum.pushMessages: {
			return {
				...state,
				messages: [actions.payload, ...state.messages]
			};
		}
		default:
			return state;
	}
};

export const onOpenChat = (open: boolean): ChatAction => ({
	type: ChatActionEnum.openChat,
	payload: open
});

export const pushMessage = (message: interfaceChatMessage): ChatAction => ({
	type: ChatActionEnum.pushMessages,
	payload: message
});

type AC1Type = ReturnType<typeof pushMessage>;

export type chatActionType = AC1Type;

export default reducer;
