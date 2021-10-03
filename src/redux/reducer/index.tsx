import { combineReducers } from 'redux';

import gameSettings from './gameSettingReducer';
import modalReducer from './modalReducer';
import userReducer from './userReducer';
import chatReducer from './chatReducer';

const reducer = combineReducers({
	gameSettings,
	userReducer,
	modalReducer,
	chatReducer
});

export default reducer;
