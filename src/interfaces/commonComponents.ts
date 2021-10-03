import { Users } from 'redux/reducer/userReducer/types';
import { TimerSettings } from '../redux/reducer/gameSettingReducer/types';

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
	login?: boolean;
}

export interface InterfaceAvatar {
	firstName: string | undefined;
	lastName: string | undefined;
	avatar: string | File;
	blockStyle?: string;
	textStyle?: string;
}

export interface intervalTimer {
	timer: TimerSettings;
	updateTimer: (props: TimerSettings) => void;
	onStopTimer?: boolean;
	onRestartTimer?: boolean;
	onStartTimer?: boolean;
}
