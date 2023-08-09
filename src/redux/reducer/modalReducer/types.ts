export type KickModalDataType = {
	id: string;
	player: string;
	playerKick: string;
	vote?: boolean;
};
export type ConnectModalDataType = {
	id: string;
	player: string;
};

export type NotificationType = {
	id: string;
	isError: boolean;
	message: string;
};

export type ModalType = {
	kickModalData: KickModalDataType[];
	connectModalData: ConnectModalDataType[];
	notifications: NotificationType[];
};
