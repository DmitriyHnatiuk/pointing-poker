import { RootState } from 'redux/store';
import { Game } from './gameSettingReducer/types';
import { Modal } from './modalReducer/types';
import { User } from './userReducer/types';
import { ChatReducer } from './chatReducer/types';

export const getMembers = (state: RootState): User => state.userReducer;

export const getGame = (state: RootState): Game => state.gameSettings;

export const getModal = (state: RootState): Modal => state.modalReducer;

export const getChat = (state: RootState): ChatReducer => state.chatReducer;
