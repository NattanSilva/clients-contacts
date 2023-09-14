import axios from 'axios';

const token = localStorage.getItem('@userToken');

const api = axios.create({
  baseURL: 'http://localhost:4012',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export default api;
