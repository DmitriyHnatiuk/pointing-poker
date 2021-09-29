export interface interfaceChatMessage {
	author: {
		firstName: string;
		lastName?: string;
		icon: File | string;
	};
	date: string;
	textMessage: string;
}
