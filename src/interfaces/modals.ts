import { Dispatch, SetStateAction } from 'react';

export interface Modal {
	type: TypeModalsOpen;
	open: Dispatch<SetStateAction<boolean>>;
	vote?: boolean;
	player?: string;
	playerKick?: string;
}

export interface InterfaceModals {
	close: () => void;
}

export interface InterfaceModalsKick {
	close: () => void;
}

export enum TypeModalsOpen {
	registration = 'REGISTRATION',
	issue = 'ISSUES',
	kick = 'KICK',
	message = 'MESSAGE',
	connect = 'USER_CONNECT'
}
