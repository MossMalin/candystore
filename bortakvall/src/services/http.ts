import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASEURL;

// Create a new axios instance
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
  timeout: 10000, // 10 seconds
});

/**
 * Generic HTTP GET request
 *
 * @param endpoint Endpoint to get
 */
export const get = async <T>(endpoint: string) => {
  const response = await instance.get<T>(endpoint, {
    validateStatus: function (status: number): boolean {
      return status < 500;
    },
  });
  return response.data;
};

/**
 * Make a generic HTTP POST request
 *
 * @param endpoint Endpoint to POST to
 * @param data Payload to POST
 */
export const post = async <Response, Payload>(
  endpoint: string,
  data: Payload
) => {
  const response = await instance.post<Response>(endpoint, data);
  return response.data;
};
