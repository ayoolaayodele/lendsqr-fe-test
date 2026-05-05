import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '../../utils/constants/api';
import {handleApiError} from '../../utils/handlers/errorHandler';

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
});

httpClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const appError = handleApiError(error);
    return Promise.reject(appError);
  },
);

export default httpClient;
