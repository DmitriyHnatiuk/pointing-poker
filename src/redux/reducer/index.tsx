import { combineReducers } from 'redux';

import gameSettings from './gameSettingReducer';
import modalReducer from './modalReducer';
import userReducer from './userReducer';

const reducer = combineReducers({
	gameSettings,
	userReducer,
	modalReducer
});

export default reducer;
