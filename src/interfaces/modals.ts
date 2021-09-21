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
	vote: boolean;
	player?: string;
	playerKick: string;
}

export enum TypeModalsOpen {
	registration = 'registration',
	issue = 'issue',
	kick = 'kick'
}
