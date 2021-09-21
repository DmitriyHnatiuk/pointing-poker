export interface Profile {
	room: string;
	admin: Users[];
	users: Users[];
	observer: Users[];
}
export interface User {
	selectedCard: string;
	roomNumber: string;
	firstName: string;
	lastName: string;
	position: string;
	avatar: string | File;
	observer: boolean;
	isAdmin: boolean;
	karma: number;
	id: string;
	users: Users[];
}

export interface Users {
	selectedCard?: string;
	roomNumber?: string;
	firstName: string;
	lastName: string;
	position: string;
	avatar: string | File;
	observer?: boolean;
	isAdmin: boolean;
	karma: number;
	id: string;
}
