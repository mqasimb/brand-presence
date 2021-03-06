const redux = require('redux');
const { createStore, combineReducers } = redux;
const applyMiddleware = redux.applyMiddleware;
const thunk = require('redux-thunk').default;
const promise = require('redux-promise');
const createLogger = require('redux-logger');
const appReducer = require('./reducers/index');
const formReducer = require('redux-form').reducer;

const logger = createLogger();

const reducer = combineReducers({
  app: appReducer,
  form: formReducer
});

const store = createStore(reducer, applyMiddleware(thunk, promise, logger));

module.exports = store;