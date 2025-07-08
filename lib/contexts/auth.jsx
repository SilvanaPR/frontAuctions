"use client";
import keycloak from "@/lib/pkg/keycloak";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    token: null,
    user: null,
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
                //checkLoginIframe: false,
            })
            .then(async (authenticated) => {
                if (authenticated) {
                    setToken(keycloak.token);
                    setCookie("access_token", keycloak.token);
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
        keycloak.logout({
            redirectUri: window.location.origin,
        });
    }, []);

    useEffect(() => {
        const existingToken = getCookie("access_token");
        if (!existingToken) {
            login();
        } else {
            setToken(existingToken);
            getUserInfo(existingToken);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                userId: user?.sub,
                token,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
