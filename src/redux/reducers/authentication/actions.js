import { createActionName } from '../../utility';
import { REDUCERS_NAME } from '../../constants';

export const reducerName = REDUCERS_NAME.AUTHENTICATION;

export const LOGIN = createActionName(reducerName, 'LOGIN');
export const LOGOUT = createActionName(reducerName, 'LOGOUT');
