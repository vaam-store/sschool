import axios, { type AxiosInstance } from 'axios';

export let client: AxiosInstance;

export const getApiClient = () => {
  if (!client) {
    client = axios.create({
      withCredentials: false,
    });
  }

  return client;
};
