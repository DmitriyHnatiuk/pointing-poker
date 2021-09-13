/* eslint-disable import/no-extraneous-dependencies */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import reducer from 'redux/reducer/reducer';
import membersReducer from 'redux/reducer/userReducer';

const rootReducer = combineReducers({
	reducer,
	membersReducer
});

const sagaMiddleware = createSagaMiddleware();
const devTools = composeWithDevTools(applyMiddleware(sagaMiddleware));

const store = createStore(rootReducer, devTools);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
