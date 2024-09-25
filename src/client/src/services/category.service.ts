import { AxiosInstance } from 'axios';
import { createApiService, get, post, put, del, API_URL } from './api.service';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
}

export const categoryService = (baseURL: string): {
  getCategory: (id: number) => Promise<Category>,
  addCategory: (data: any) => Promise<Category>,
  getCagetories: (id: number) => Promise<Category[]>,
} => {
  const api: AxiosInstance = createApiService(baseURL);
  
  return {
    getCategory: async (id: number) => get<Category>(`/users/${id}`, api),
    addCategory: async (data: Category) => {
      console.log({data});
    return  post<Category>('/addCategory', data, api)
    },
    getCagetories: async (id: number) => get<Category[]>(`/users/${id}`, api),
  };
};

export default categoryService(API_URL);