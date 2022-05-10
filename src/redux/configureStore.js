import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { useMemo } from 'react';
import createFilter from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import clients from '../config/clients';
import reducerRegistery from './ReducerRegistery';
import createApiClient from './middleware/apiClients';

import authReducer from './reducers/authentication';
import userReducer from './reducers/user';

import { REDUCERS_NAME } from './constants';

export const saveAuthFilter = createFilter(REDUCERS_NAME.AUTHENTICATION, ['login']);
export const loadAuthFilter = createFilter(REDUCERS_NAME.AUTHENTICATION, null, ['login']);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    REDUCERS_NAME.AUTHENTICATION,
  ],
  transforms: [
    saveAuthFilter,
    loadAuthFilter,
  ],
};

// Add default reducers
reducerRegistery.register(REDUCERS_NAME.AUTHENTICATION, authReducer);
reducerRegistery.register(REDUCERS_NAME.USER, userReducer);

const reducers = combineReducers(reducerRegistery.getReducers());
const persistedReducer = persistReducer(persistConfig, reducers);

function makeStore(preloadedState) {
  return configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk, createApiClient(clients)],
    preloadedState,
    reducer: persistedReducer,
  });
}

let store;

export const initializeStore = (preloadedState) => {
  let newStore = store || makeStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    newStore = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return newStore;
  // Create the store once in the client
  if (!store) store = newStore;

  return newStore;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
