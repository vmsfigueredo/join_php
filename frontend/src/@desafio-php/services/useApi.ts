import axios from "axios";

export const useApi = () => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response && err.response.data.error) {
        console.error(err.response.data.error);
      }

      return Promise.reject(err);
    }
  );

  return axiosInstance;
}
