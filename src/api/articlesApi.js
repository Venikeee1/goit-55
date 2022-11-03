import axios from 'axios';

const BASE_URL = 'https://hn.algolia.com/api/v1';

export const fetchArticles = (query) => {
  return axios.get(`${BASE_URL}/search?query=${query}`);
};
