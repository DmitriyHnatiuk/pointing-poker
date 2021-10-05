import { PlayingCard } from 'redux/reducer/gameSettingReducer/types';

export interface issue {
	id: string;
	title: string;
	priority: string;
	link: string;
	active: boolean;
	card: PlayingCard[];
}

export interface Result {
	result: issue[];
}
