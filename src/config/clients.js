import axios from 'axios';
import has from 'lodash/has';
import constants from '../constants';

export const errorMessage = (error) => {
  let msg = '';
  if (error.request) {
    if (error.message === 'Network Error') {
      msg = 'No internet connection';
    } else if (error.request.status === 401) {
      msg = 'You are not authorized to access.';
    } else if (error.request.status === 500 || error.request.status === 404) {
      msg = 'Server Error: We\'re sorry, but something went wrong. Try again';
    } else {
      const code = error.request.status;
      msg = has(constants.HTTPStatusCode, code) ? `${constants.HTTPStatusCode[code]}` : null;
    }
  } else {
    msg = error.message;
  }
  return msg;
};

const configureClients = ({ baseURL, apiURL, googleMapsURL }) => ({
  default: {
    client: axios.create({
      baseURL,
      responseType: 'json',
      headers: {
        common: {
          Accept: 'application/json',
        },
        post: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    }),
  },
  api: {
    client: axios.create({
      baseURL: apiURL,
      responseType: 'json',
      headers: {
        common: {
          Accept: 'application/json',
        },
        post: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    }),
  },
  googleMaps: {
    client: axios.create({
      baseURL: googleMapsURL,
      responseType: 'json',
      headers: {
        common: {
          Accept: 'application/json',
        },
        post: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    }),
  },
});

export default configureClients(constants);
