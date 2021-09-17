import { combineReducers } from 'redux';

import gameSettings from './gameSettingReducer';
import userReducer from './userReducer';
import membersReducer from './membersReducer';

const reducer = combineReducers({ gameSettings, userReducer });

export default reducer;
