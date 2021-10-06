export interface IUser {
	id: number;
	firstName: string;
	lastName: string;
	job: string;
	role: RolesUsersEnum;
	avatar: string;
}

export interface IUsersState {
	members: IUser[];
}

export enum RolesUsersEnum {
	REGULAR = 'regular',
	ADMIN = 'admin',
	OBSERVER = 'observer'
}

export enum UsersActionsEnum {
	DELETE_USER = 'DELETE_USER'
}

interface IDelleteUserAction {
	type: UsersActionsEnum.DELETE_USER;
	payload: IUser;
}

export type UsersAction = IDelleteUserAction;
