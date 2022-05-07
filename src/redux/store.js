import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { useMemo } from 'react';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import createFilter from 'redux-persist-transform-filter';

let store;

const exampleInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
  exampleData: [],
  error: null,
};

export const actionTypes = {
  TICK: 'TICK',
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
  LOAD_EXAMPLE_DATA: 'LOAD_EXAMPLE_DATA',
  LOADING_DATA_FAILURE: 'LOADING_DATA_FAILURE',
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.TICK:
      return {
        ...state,
        lastUpdate: action.ts,
        light: !!action.light,
      };
    case actionTypes.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case actionTypes.DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    case actionTypes.RESET:
      return {
        ...state,
        count: exampleInitialState.count,
      };
    case actionTypes.LOAD_EXAMPLE_DATA:
      return {
        ...state,
        exampleData: action.data,
      };
    case actionTypes.LOADING_DATA_FAILURE:
      return { ...state, error: true };
    default:
      return state;
  }
};

// ACTIONS
export const serverRenderClock = () => ({ type: actionTypes.TICK, light: false, ts: Date.now() });
export const startClock = () => ({ type: actionTypes.TICK, light: true, ts: Date.now() });

export const incrementCount = () => ({ type: actionTypes.INCREMENT });

export const decrementCount = () => ({ type: actionTypes.DECREMENT });

export const resetCount = () => ({ type: actionTypes.RESET });

export const loadExampleData = (data) => ({ type: actionTypes.LOAD_EXAMPLE_DATA, data });

export const loadingExampleDataFailure = () => ({ type: actionTypes.LOADING_DATA_FAILURE });

export const saveExampleDataFilter = createFilter('reducer', ['exampleData']);
export const loadExampleDataFilter = createFilter('reducer', null, ['exampleData']);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['reducer'], // place to select which state you want to persist
  transforms: [
    saveExampleDataFilter,
    loadExampleDataFilter,
  ],
};

const reducers = combineReducers({
  reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

function makeStore(preloadedState) {
  return configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
    preloadedState,
    reducer: persistedReducer,
  });
}

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
