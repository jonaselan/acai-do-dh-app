import axios from 'axios';

const api = axios.create({
  baseURL: 'https://acai-do-dh-api.herokuapp.com',
});

export default api;
