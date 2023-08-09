export interface IData {
	roomId: string;
	firstName: string;
	lastName: string;
	position: string;
	avatar: string | File;
	isObserver: boolean;
	isAdmin: boolean;
	karma: number;
	id: string;
	adminId: string;
}
export interface IUser {
	data: IData;
	users: { [key: string]: IUsers };
}

export interface IUsers {
	roomId: string;
	firstName: string;
	lastName: string;
	position: string;
	avatar: string;
	isObserver: boolean;
	isAdmin: boolean;
	karma: number;
	id: string;
	adminId: string;
}

export type UsersDataType = { players: IUsers[]; observers: IUsers[] };

export type GetUsersType = { users: IUsers[]; admin: IUsers | null };
