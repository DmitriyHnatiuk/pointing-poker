import { Dispatch, SetStateAction } from 'react';

export interface Modal {
	type: TypeModalsOpen;
	open: Dispatch<SetStateAction<boolean>>;
	vote?: boolean;
	player?: string;
	playerKick?: string;
}

export interface InterfaceModals {
	open: Dispatch<SetStateAction<boolean>>;
}

export interface InterfaceModalsKick {
	open: Dispatch<SetStateAction<boolean>>;
	vote: boolean;
	player?: string;
	playerKick: string;
}

export enum TypeModalsOpen {
	registration = 'registration',
	issue = 'issue',
	kick = 'kick'
}
