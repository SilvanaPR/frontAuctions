"use client";
import keycloak from "@/lib/pkg/keycloak";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { apiAuction, apiProduct, apiUser, setLogoutCallback, logoutCallback } from "../axios";

const AuthContext = createContext({
    isAuthenticated: false,
    token: null,
    user: null,
    userId: null,
    logout: () => { },
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setAuth] = useState(false);
    const [token, setToken] = useState(null);
    const isRun = useRef(false);

    const getUserInfo = async (token) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/userinfo`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await res.json();
            setUser(data);
            setCookie("userId", data?.sub);
            setAuth(true);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    const login = async () => {
        if (isRun.current) return;
        isRun.current = true;

        keycloak
            .init({
                onLoad: "login-required",
                pkceMethod: "S256",
            })
            .then(async (authenticated) => {
                if (authenticated) {
                    setToken(keycloak.token);
                    setCookie("access_token", keycloak.token);
                    setCookie("userId", keycloak.token);
                    await getUserInfo(keycloak.token);
                } else {
                    console.warn("User not authenticated");
                }
            })
            .catch((err) => {
                console.error("Keycloak init error:", err);
            });
    };

    const logout = useCallback(() => {
        deleteCookie("access_token");
        debugger
        if (keycloak && keycloak.logout) {
            keycloak.logout({
                redirectUri: window.location.origin,
            });
        }
    }, []);


    useEffect(() => {
        logoutCallback === null && setLogoutCallback(logout);
        const existingToken = getCookie("access_token");
        if (!existingToken && !window.location.href.includes("Login")) {
            login();
        } else {
            setToken(existingToken);
            getUserInfo(existingToken);
        }
    }, []);

    useEffect(() => {
        debugger
        logoutCallback === null && setLogoutCallback(logout);
    }, [logout]);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                userId: user?.sub,
                token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
