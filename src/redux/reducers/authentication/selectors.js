import { createSelector } from 'reselect';
import { REDUCERS_NAME } from '../../constants';

const reducerName = REDUCERS_NAME.AUTHENTICATION

export const loginBase = (state) => state[reducerName]?.login || {};
export const selectAuthToken = createSelector(loginBase, (data) => data?.access_token || null);
export const selectIsLoggedIn = createSelector(loginBase, (data) => data?.isLoggedIn || false);
export const selectLoginData = createSelector(loginBase, (data) => data?.data || {});
export const selectLoginError = createSelector(loginBase, (data) => data?.error || null);
export const selectLoginIsLoading = createSelector(loginBase, (data) => data?.loader || false);
