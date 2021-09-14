/* eslint-disable import/no-extraneous-dependencies */
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import reducer from 'redux/reducer';
import membersReducer from 'redux/reducer/membersReducer';

const rootReducer = combineReducers({
	reducer,
	membersReducer
});

const composeDev = composeWithDevTools || compose;

const devTools = composeDev(applyMiddleware(thunkMiddleware));

const store = createStore(rootReducer, devTools);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
