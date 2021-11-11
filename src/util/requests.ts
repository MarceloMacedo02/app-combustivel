import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import history from './history';
import { getAuthData } from './storage';

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';
 

type LoginData = {
  email: string;
  password: string;
};

export const requestBackendLogin = (loginData: LoginData) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
   
  };

  const data = qs.stringify({
    ...loginData, 
  });

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/api/auth',
     data:loginData
  });
};

export const requestBackend = (config: AxiosRequestConfig) => {
  config = {
    ...config, 
  }

  const headers =   {
        ...config.headers,
        Authorization:  getAuthData().token,
      };
     
console.log(headers);

  return axios({ ...config, baseURL: BASE_URL, headers });
};

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    //
    return config;
  },
  function (error) {
    //
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    //
    return response;
  },
  function (error) {
    /*if (error.response.status === 401) {
      history.push('/admin/auth');
    }
    */
    return Promise.reject(error);
  }
);
