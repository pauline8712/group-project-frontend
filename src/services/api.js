import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7057/api',
});

export default api;