import { REDUCERS_NAME } from '../../constants';
import { createActionName } from '../../utility';

export const reducerName = REDUCERS_NAME.USER;

// Actions
export const USER = createActionName(reducerName, 'USER');
export const USER_UPDATE = createActionName(reducerName, 'USER_UPDATE');
export const IMAGE_UPDATE = createActionName(reducerName, 'IMAGE_UPDATE');
export const GET_FAVOURITES = createActionName(reducerName, 'GET_FAVOURITES');
export const SET_MANAGER_TUTORIAL_SEEN = createActionName(reducerName, 'SET_TUTORIAL_SEEN');
