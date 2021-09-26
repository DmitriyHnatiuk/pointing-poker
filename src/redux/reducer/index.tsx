import { combineReducers } from 'redux';

import gameSettings from './gameSettingReducer';
import routerReducer from './routerReducer';
import modalReducer from './modalReducer';
import userReducer from './userReducer';

const reducer = combineReducers({
	gameSettings,
	userReducer,
	routerReducer,
	modalReducer
});

export default reducer;
