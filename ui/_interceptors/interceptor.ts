import axios from 'axios';
import {TokenStorageService} from './token-storage';
import router from 'next/router';

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const URL = process.env.NEXT_PUBLIC_API;
const tokenStorage = new TokenStorageService();

const ApiClient = () => {
  const defaultOptions = {
    baseURL
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    const token = tokenStorage.getToken()

    if (token) {
      // @ts-ignore
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  });

  instance.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      const originalConfig = error.config;
      if (originalConfig.url !== baseURL + '/login_check' && error.response) {
        // Access Token was expired
        if (error.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const response = await axios.post(URL + '/token/refresh', {
                refreshToken: tokenStorage.getRefreshToken()
              }
            );

            const token = response.data.token;
            const refresh = response.data.refreshToken;

            tokenStorage.saveToken(token);
            tokenStorage.saveRefreshToken(refresh);

            return instance(originalConfig);
          } catch (_error) {
            // Logging out the user by removing all the tokens from local
            tokenStorage.removeToken();
            tokenStorage.removeRefreshToken();
            // Redirecting the user to the landing page
            await router.push('/login')
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default ApiClient();
