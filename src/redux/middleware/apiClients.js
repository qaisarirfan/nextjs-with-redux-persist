import get from 'lodash/get';
import { LOADING, LOADED, ERROR } from './actions';
import { selectAuthToken } from '../reducers/authentication/selectors';
import { errorMessage } from '../../config/clients';

const apiClients = (clients) => (store) => (next) => (action) => {
  const makeAction = (status, data) => {
    const newAction = { ...action, type: action.type + status, ...data };
    delete newAction.request;
    return newAction;
  };

  const addTokenToRequest = (state, request) => {
    const authToken = selectAuthToken(state);
    return authToken
      ? {
        ...request,
        headers: {
          ...(request.headers || null),
          Authorization: `Bearer ${authToken}`,
        },
      }
      : request;
  };

  if (!action || !action.request) {
    return next(action);
  }

  const clientName = action.client || 'default';
  if (!clients[clientName]) {
    throw new Error(`Client with name "${clientName}" has not been defined in middleware`);
  }

  next(makeAction(LOADING, false));

  const request = addTokenToRequest(store.getState(), action.request);
  return clients[clientName].client.request(request).then(
    (result) => {
      const errors = get(result, 'data.errors', []);
      const payload = { result: result.data, originalPayload: action.payload };
      if (errors) {
        payload.error = {
          result: errors,
        };
      }
      next(makeAction(LOADED, { payload }));
      if (action.callback) {
        const { dispatch, getState } = store;
        action.callback(dispatch, getState, payload);
      }
    },
    (error) => {
      next(
        makeAction(ERROR, {
          payload: {
            result: errorMessage(error),
            originalPayload: action.payload,
          },
        }),
      );
    },
  );
};

export default apiClients;
