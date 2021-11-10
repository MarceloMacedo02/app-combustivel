
import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import history from './history';
import { getAuthData } from './storage';

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'myappname123';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'myappsecret123';

type LoginData = {
  username: string;
  password: string;
};

 
export const requestBackendLogin = (loginData: LoginData) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET),
  };

  const data = qs.stringify({
    ...loginData,
    grant_type: 'password',
  });

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/oauth/token',
    data,
    headers,
  });
};
/**
 * 
 * @param config 
 * @returns 
 */
export const requestBackendWithCredentials = (config: AxiosRequestConfig) => {
  ////console.log( getAuthData().access_token);
  config = {
    ...config,
    withCredentials: true,
  }
  const headers = config.withCredentials
    ? {
      ...config.headers,
      Authorization: 'Bearer ' + getAuthData().access_token,
    }
    : config.headers;
  try {
    return axios({ ...config, baseURL: BASE_URL, headers });

  } catch (error) {

    //console.log(error) 
  }
  return axios({ ...config, baseURL: BASE_URL, headers });
};
export const requestBackendWithFile = (config: AxiosRequestConfig) => {
  ////console.log( getAuthData().access_token);
  config = {
    ...config,
    withCredentials: true,
  }
  const headers = config.withCredentials
    ? {
      ...config.headers, 
      Authorization: 'Bearer ' + getAuthData().access_token,
 
    }
    : config.headers;
  try {
    return axios({ ...config, baseURL: BASE_URL, headers });

  } catch (error) {

    //console.log(error) 
  }
  return axios({ ...config, baseURL: BASE_URL, headers });
};

export const requestBackendNonCredentials = (config: AxiosRequestConfig) => {
  ////console.log( getAuthData().access_token);
  config = {
    ...config,
    withCredentials: true,
  }

  try {
    return axios({ ...config, baseURL: BASE_URL, });

  } catch (error) {

    //console.log(error) 
  }
  return axios({ ...config, baseURL: BASE_URL, });
};
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    //
    return config;
  },
  function (error) {

    console.log(error.response.error );
    return Promise.reject(error);
  }
);


// Add a response interceptor
axios.interceptors.response.use(

  function (response) {

    //console.log(response);
    return response;
  },
  function (error) {

    if (error.response.status === 403) {
      //console.log(error.response.error );

    }

    if (error.response.status === 401) {
      history.push('/admin/auth');
    } else {

    }
    return Promise.reject(error);

  }
);
