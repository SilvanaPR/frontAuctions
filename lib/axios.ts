import axios from 'axios';
import { getAuthData } from "./utils/authHelpers";
import { deleteCookie } from 'cookies-next';

let logoutCallback: (() => void) | null = null;

export function setLogoutCallback(cb: () => void) {
  logoutCallback = cb;
}

const validateLogout = () => {
  if (logoutCallback) {
    logoutCallback();
  } else {
    // Fallback: trigger Keycloak login directly
    if (typeof window !== "undefined") {
      // Dynamically import keycloak to avoid circular dependency
      import("./pkg/keycloak").then((mod) => {
        const keycloak = mod.default;
        if (keycloak && typeof keycloak.logout === "function" && keycloak.kc) {
          keycloak.logout({
            redirectUri: window.location.origin,
          });
        } else {
          debugger
          const keycloakUrl = process.env.NEXT_PUBLIC_KEYCLOAK_URL;
          const realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM;
          const redirectUri = encodeURIComponent(window.location.origin);
          deleteCookie("access_token");
        }
      });
    }
  }
}

function applyAuthInterceptor(instance: any) {
  instance.interceptors.request.use((config: any) => {
    const { token } = getAuthData();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  instance.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        return validateLogout();
      }
      return Promise.reject(error);
    }
  );
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

    