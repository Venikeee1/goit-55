import axios from 'axios';

const BASE_URL = 'https://goit-task-manager.herokuapp.com';

export const login = (credentials) => {
  return axios.post(`${BASE_URL}/users/login`, credentials);
};

export const register = (credentials) => {
  return axios.post(`${BASE_URL}/users/signup`, credentials);
};

export const refreshUser = () => {
  return axios.get(`${BASE_URL}/users/me`);
};

export const logout = () => {
  return axios.post(`${BASE_URL}/users/logout`);
};
