/* eslint-disable import/no-extraneous-dependencies */
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducer from 'redux/reducer/reducer';

const sagaMiddleware = createSagaMiddleware();
const devTools = composeWithDevTools(applyMiddleware(sagaMiddleware));

const store = createStore(reducer, devTools);

export default store;
