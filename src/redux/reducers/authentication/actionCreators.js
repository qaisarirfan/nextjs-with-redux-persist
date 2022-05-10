import { LOGIN, LOGOUT } from './actions';

export function login() {
  return {
    type: LOGIN,
    request: {
      type: 'get',
      url: '/latest',
    },
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
