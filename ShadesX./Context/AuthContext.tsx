import {useContext, createContext, useEffect, useState, ReactNode} from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserType = {
    _id: string;
    email: string;
    password: string;
};

type AuthType = {
    user : UserType | null;
    token: string | null;
    loading: boolean;
    login: (token : string, user : UserType) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children } : {children:ReactNode}) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const restoreSession = async () => {
            try {
                const savedToken = await AsyncStorage.getItem("token");
                const savedUser = await AsyncStorage.getItem("user");

                if (savedToken && savedUser) {
                    setToken(savedToken);
                    setUser(JSON.parse(savedUser));
                }
            } finally {
                setLoading(false);
            }
        };

        restoreSession();
    }, []);


    const login = async (newToken: string, userData : UserType) => {
        try{
            setToken(newToken);
            setUser(userData);

            await AsyncStorage.setItem("token", newToken);
            await AsyncStorage.setItem("user",JSON.stringify(userData));

            axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        }catch (error) {
            console.error("Login Error:- ",error);
        }

    };

    const logout = async () => {
        try{
            setToken(null);
            setUser(null);

            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");

            delete axios.defaults.headers.common["Authorization"];

        }catch (error) {
            console.error("Logout Error :- ",error);
        }
    }

    return (
        <AuthContext.Provider value={{user, token, loading, logout, login}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};

