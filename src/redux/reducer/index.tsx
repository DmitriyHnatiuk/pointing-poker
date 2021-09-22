import { combineReducers } from 'redux';

import gameSettings from './gameSettingReducer';
import routerReducer from './routerReducer';
import userReducer from './userReducer';

const reducer = combineReducers({ gameSettings, userReducer, routerReducer });

export default reducer;
