/* eslint-disable import/no-extraneous-dependencies */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import reducer from 'redux/reducer';

const composeDev = composeWithDevTools || compose;
const devTools = composeDev(applyMiddleware(thunkMiddleware));

const store = createStore(reducer, devTools);

export default store;
