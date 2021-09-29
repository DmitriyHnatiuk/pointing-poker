import { interfaceChatMessage } from '../../../interfaces/commonChat';

export interface ViewChat {
	type: ChatActionEnum.openChat;
	payload: boolean;
}

export interface pushMessages {
	type: ChatActionEnum.pushMessages;
	payload: interfaceChatMessage;
}

export interface ChatReducer {
	open: boolean;
	messages: interfaceChatMessage[];
}

export type ChatAction = ViewChat | pushMessages;

export enum ChatActionEnum {
	openChat = `openChat`,
	pushMessages = `pushMessages`
}
