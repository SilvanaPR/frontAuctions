import axios from 'axios';
import { getAuthData } from "./utils/authHelpers";

function applyAuthInterceptor(instance: any) {
  instance.interceptors.request.use((config: any) => {
    const { token } = getAuthData();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}

export const apiProduct = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_PRODUCT,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});
applyAuthInterceptor(apiProduct);

export const apiAuction = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_AUCTION,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});
applyAuthInterceptor(apiAuction);

export const apiUser = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_USER,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});
applyAuthInterceptor(apiUser);

