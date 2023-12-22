// api/AuthContext.js
import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [username, setUserName] = useState('');

    const login = async () => {
        try {
            const res = await axios({
                method: 'get',
                withCredentials: true,
                url: 'http://localhost:4500/user',
            });

            if (res.data.user_id !== undefined && /^20000/.test(res.data)) {
                setLoggedIn(true);
                setUserName(res.data.username); // Update with actual username property
            } else {
                console.log('No user found');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const logout = () => {
        setLoggedIn(false);
        axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:4500/authentication/logout',
        }).then((res) => {
            if (/^20900/.test(res.data)) {
                console.log('User logged out');
            }
        });
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export const { logout } = AuthContext;