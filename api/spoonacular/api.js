import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.spoonacular.com',
});

api.interceptors.request.use(
  async (config) => {
    config.headers.Accept = 'application/json';
    config.params = {...config.params, apiKey: '80b638558a6842fabc2a3316e3bcff8e'}
    return config;
  },
  (err) => {
    // called when error
    return Promise.reject(err);
  }
);

export default api;