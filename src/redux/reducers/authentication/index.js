import { createReducer } from '../../utility';
import { ERROR, LOADED, LOADING } from '../../middleware/actions';
import { LOGIN, LOGOUT } from './actions';

const initialState = {
  login: {
    data: null,
    isLoggedIn: false,
    error: null,
    loader: false,
  },
};

const reducers = {
  [LOGIN](state) {
    return {
      ...state,
      login: {
        ...state.login,
        isLoggedIn: true,
      },
    };
  },

  [LOGIN + LOADING](state) {
    return {
      ...state,
      login: {
        ...state.login,
        data: null,
        error: null,
        loader: true,
      },
    };
  },

  [LOGIN + LOADED](state, payload) {
    return {
      ...state,
      login: {
        ...state.login,
        data: payload,
        loader: false,
      },
    };
  },

  [LOGIN + ERROR](state, payload) {
    return {
      ...state,
      login: {
        ...state.login,
        data: null,
        loader: false,
        error: payload,
      },
    };
  },

  [LOGOUT]() {
    return initialState;
  },

  [LOGOUT + LOADED]() {
    return initialState;
  },
};

export default createReducer(reducers, initialState);
