import axios from 'axios';

const service = axios.create({
  timeout: 15000,
});

// 请求拦截
service.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json';
  config.headers['X-Token'] = '';
  return config;
});

// 响应拦截
service.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  },
);

export const get = (url, params) => service.get(url, { params });
export const post = (url, data) => service.post(url, data);
