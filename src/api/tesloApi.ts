import axios from 'axios';
import { useAuthStore } from '../stores';

const tesloApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Leer cualquier petición que pase por tesloApi con este interceptor de axios
// Leer el store de Zustand fuera del contexto de React
tesloApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  // console.log(token);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

export { tesloApi };
