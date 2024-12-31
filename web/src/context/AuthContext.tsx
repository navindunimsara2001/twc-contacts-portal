import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AuthContextType, AuthUser } from '../utils/types';
import { userLogin } from '../utils/api';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null);

    useEffect(() => {
        if (token) {
            const tokenData = jwtDecode<AuthUser>(token);
            setUser(tokenData);
        }
    }, [token]);

    const login = async ({email, password}:{email: string, password: string}) => {
        const token = await userLogin(email, password);
        setToken(token);
        localStorage.setItem("token", token);
    }

    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType|null=> {
    return useContext(AuthContext);
}
