import axios from 'axios';
import qs from 'qs';

import { camelize, decamelize } from './keysConverter';

const authenticityToken = () => {
  const token = document.querySelector('meta[name="csrf-token"]');
  return token ? token.content : null;
};

const headers = () => ({
  Accept: '*/*',
  'Content-Type': 'application/json',
  'X-CSRF-Token': authenticityToken(),
  'X-Requested-With': 'XMLHttpRequest',
});

axios.defaults.headers = {
  ...axios.defaults.headers,
  get: headers(),
  post: headers(),
  put: headers(),
  delete: headers(),
};

axios.interceptors.response.use(null, (error) => {
  if (error.response.status === 422) {
    const { errors } = error.response.data.errors;
    return Promise.reject(errors);
  }

  if (error.response.status === 500) {
    return Promise.reject(new Error('Something went wrong. Please, try again.'));
  }

  return Promise.reject(error);
});

export default {
  get(url, params = {}) {
    return axios
      .get(url, {
        params: decamelize(params),
        paramsSerializer: { serialize: (parameters) => qs.stringify(parameters, { encode: false }) },
      })
      .then(camelize);
  },
  post(url, json) {
    const body = decamelize(json);
    return axios.post(url, body).then(camelize);
  },
  put(url, json) {
    const body = decamelize(json);
    return axios.put(url, body).then(camelize);
  },
  delete(url, json) {
    const body = decamelize(json);
    return axios.delete(url, body).then(camelize);
  },
};
