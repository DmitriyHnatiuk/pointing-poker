import { RootState } from 'redux/store';
import { Game } from './gameSettingReducer/types';
import { User } from './userReducer/types';

export const getMembers = (state: RootState): User => state.userReducer;

export const getGame = (state: RootState): Game => state.gameSettings;
