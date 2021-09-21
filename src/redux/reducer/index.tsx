import { combineReducers } from 'redux';

import gameSettings from './gameSettingReducer';
import userReducer from './userReducer';

const reducer = combineReducers({ gameSettings, userReducer });

export default reducer;
