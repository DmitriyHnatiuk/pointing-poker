import { RootState } from 'redux/store';
import { Game } from './gameSettingReducer/types';
import { Modal } from './modalReducer/types';
import { Rout } from './routerReducer/types';
import { User } from './userReducer/types';

export const getMembers = (state: RootState): User => state.userReducer;

export const getGame = (state: RootState): Game => state.gameSettings;

export const getPath = (state: RootState): Rout => state.routerReducer;

export const getModal = (state: RootState): Modal => state.modalReducer;
