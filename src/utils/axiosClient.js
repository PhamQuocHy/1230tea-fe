import axios from 'axios';
import queryString from 'query-string';
import { store } from '../redux/store';
import { API_URL } from './ApiUrl';

export const getFormData = (formObject = {}) => {
  let formBody = new FormData();
  for (let property in formObject) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = formObject[property];
    if (encodedKey === 'files') {
      encodedValue.map(obj => {
        formBody.append('files', obj);
      });
    } else if (encodedValue != null) {
      formBody.append(encodedKey, encodedValue);
    }
  }
  return formBody;
};

const axiosClient = axios.create({
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Headers": "X-Requested-With"
  },

  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async config => {
  const url = API_URL;
  const token = await store.getState().rootReducer.auth.token;
  const branch = await store.getState().rootReducer.auth.user;

  config.baseURL = url;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    if (config.method === 'get' || config.method === 'path') {
      const param = config.params;
      if (param) {
        param.department_id = branch.department_id;
        config.params = param;
      }
    } else {
      const data = config.data;
      if (data) {
        data.department_id = branch.department_id;
        config.data = data;
      }
    }
  }
  // console.log('config: ', config);
  return config;
});

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response;
    }
    return response;
  },
  error => {
    // Handle errors
    console.log('ERROR: ', error);
    throw error;
  },
);
export default axiosClient;
