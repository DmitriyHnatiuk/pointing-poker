import { Users } from 'redux/reducer/userReducer/types';

export interface IGitHubItems {
	id: number;
	href: string;
	name: string;
}

export interface ActionCreationArguments {
	firstName?: string;
	lastName?: string;
	position?: string;
	avatar?: string | File;
	observer?: boolean;
	isAdmin?: boolean;
	selectedCard?: string;
	roomNumber?: string;
	karma?: number;
	users?: Users[];
	id?: string;
}

export interface InterfaceAvatar {
	firstName: string | undefined;
	lastName: string | undefined;
	avatar: File | string;
}
