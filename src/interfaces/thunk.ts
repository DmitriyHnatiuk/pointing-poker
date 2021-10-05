import { Game, Issue } from 'redux/reducer/gameSettingReducer/types';

import { interfaceChatMessage } from './commonChat';

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
	message?: string | interfaceChatMessage;
	id?: string;
	gameSettings?: Game;
	issue?: Issue;
}
