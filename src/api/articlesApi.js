import axios from 'axios';

const BASE_URL = 'https://hn.algolia.com/api/v1';

export const fetchArticles = (query, page = 1) => {
  return axios.get(`${BASE_URL}/search?query=${query}&page=${page}`);
};

export const fetchArticleById = (id) => {
  return axios.get(`${BASE_URL}/items/${id}`);
};

export const getLikedPostsDetails = (ids) => {
  const promises = ids.map((id) => fetchArticleById(id));
  return Promise.all(promises);
};
