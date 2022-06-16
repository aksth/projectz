import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.spoonacular.com',
});

api.interceptors.request.use(
  async (config) => {
    config.headers.Accept = 'application/json';
    config.params = {...config.params, apiKey: 'spoonacularapikeyremoved'}
    return config;
  },
  (err) => {
    // called when error
    return Promise.reject(err);
  }
);

export default api;