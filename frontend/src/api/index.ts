import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (userData: FormData) => api.post('/user/create', userData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  login: (credentials: { userEmail: string; userPassword: string }) => 
    api.post('/user/login', credentials),
};

export const companyAPI = {
  create: (companyData: FormData) => api.post('/company/createcompany', companyData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  list: () => api.get('/company/listcompany'),
  details: (id: string) => api.get(`/company/companydetails/${id}`),
  search: (letter: string) => api.get(`/company/searchcompany/${letter}`),
};

export const reviewAPI = {
  create: (reviewData: any) => api.post('/review/createreview', reviewData),
  list: () => api.get('/review/listreviews'),
};

export default api;
