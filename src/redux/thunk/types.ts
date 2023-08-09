import { IPlanning, IssueType } from '../reducer/planningReducer/types';

export interface IChatMessage {
	id: string;
	author: {
		authorId: string;
		firstName: string;
		lastName?: string;
		icon: string;
	};
	date: string;
	message: string;
}

type UserDataTypes = {
	firstName: string;
	lastName: string;
	position: string;
	isObserver: boolean;
	avatar: { file: File; fileName: string } | null;
	isAdmin: boolean;
	roomId: string;
};

export type DataTypes = {
	type: string;
	usersData?: Partial<UserDataTypes>;
	message?: string | IChatMessage;
	id?: string;
	planningSettings?: IPlanning;
	issue?: IssueType;
};
