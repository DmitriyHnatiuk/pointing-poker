import { IChatMessage } from 'src/interfaces/thunkTypes';

export type ChatType = {
	isOpenChat: boolean;
	messages: Record<string, IChatMessage>;
};
