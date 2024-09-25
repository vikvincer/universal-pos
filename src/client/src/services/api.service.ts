import axios, { AxiosInstance, AxiosResponse } from 'axios';

export const API_URL = 'https://localhost';

interface ApiResponse<T> {
  data: T;
}

export const createApiService = (baseURL: string): AxiosInstance => {
  return axios.create({ baseURL });
};

export const get = async <T>(url: string, api: AxiosInstance): Promise<T> => {
  const response: AxiosResponse<ApiResponse<T>> = await api.get(url);
  return response.data.data;
};

export const post = async <T>(url: string, data: any, api: AxiosInstance): Promise<T> => {
  const response: AxiosResponse<ApiResponse<T>> = await api.post(url, data);
  console.log(response);
  return response.data.data;
};

export const put = async <T>(url: string, data: any, api: AxiosInstance): Promise<T> => {
  const response: AxiosResponse<ApiResponse<T>> = await api.put(url, data);
  return response.data.data;
};

export const del = async <T>(url: string, api: AxiosInstance): Promise<T> => {
  const response: AxiosResponse<ApiResponse<T>> = await api.delete(url);
  return response.data.data;
};