const tokenKey = 'authData';

type LoginResponse = {
  access_token: string; 
  expires_in: number;
  scope: string;
  url:string;
  usuario: any;
  userId: number;
};

export const saveAuthData = (obj: LoginResponse) => {
  localStorage.setItem(tokenKey, JSON.stringify(obj));
};

export const getAuthData = () => {
  const str = localStorage.getItem(tokenKey) ?? '{}';
  return JSON.parse(str) as LoginResponse;
};
/*
export const removeAuthData = () => {
  localStorage.removeItem(tokenKey);
};*/
