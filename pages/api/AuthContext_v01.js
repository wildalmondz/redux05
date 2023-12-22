// api/AuthContext.js
import { createContext, useContext, useState } from 'react';
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [ username, setUserName ] = useState('');

    const login = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:4500/user"
       }).then((res) => {
                    console.log(JSON.stringify(res))
                    if (res.data.user_id !== undefined) {
                        console.log(`User_id found ${JSON.stringify(res.data)}`);
                        setLoggedIn(true);
                        if (/^20000/.test(res.data)) {
                            console.log(`found 20000 ${res.data}`);
                            //return (res);
                        }
                    }
                    else {
                        console.log('No res found');
                    }
                }).catch(err => console.log(err));
    };

    const logout = () => {
        // setLoggedIn(false);
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:4500/authentication/logout"
        }).then(res => {
            if (/^20900/.test(res.data)) {
                console.log('User logged out')
            }
        })
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