import { combineReducers } from 'redux';

import gameSettings from './gameSettingReducer';
import resultReducer from './ResultReducer';
import modalReducer from './modalReducer';
import userReducer from './userReducer';
import chatReducer from './chatReducer';

const reducer = combineReducers({
	gameSettings,
	userReducer,
	modalReducer,
	chatReducer,
	resultReducer
});

export default reducer;
