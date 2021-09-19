export interface Game {
	userName: string;
	isAdmin: boolean;
	room: string;
	planningTitle: string;
	issues: Array<string>;
	cards: Array<string>;
}
