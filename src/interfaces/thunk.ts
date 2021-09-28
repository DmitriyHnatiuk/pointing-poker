import { Game } from 'redux/reducer/gameSettingReducer/types';

export interface userDataTypes {
	firstName?: string;
	lastName?: string;
	position?: string;
	observer?: boolean;
	avatar?: string | File;
	isAdmin?: boolean;
	roomNumber?: string;
}

export interface dataTypes {
	type: string;
	usersData?: userDataTypes | null;
	message?: string;
	id?: string;
	gameSettings?: Game;
}
