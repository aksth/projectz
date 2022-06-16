import axios from 'axios';

import { spoonacularApiKey } from '../../apikeys';

const api = axios.create({
  baseURL: 'https://api.spoonacular.com',
});

api.interceptors.request.use(
  async (config) => {
    config.headers.Accept = 'application/json';
    config.params = {...config.params, apiKey: spoonacularApiKey}
    return config;
  },
  (err) => {
    // Errror
    return Promise.reject(err);
  }
);

export default api;
