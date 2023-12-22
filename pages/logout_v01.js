// logout.tsx

import { useEffect } from 'react';
import { useAuth } from './api/AuthContext';
import { useRouter } from 'next/router';

import axios from 'axios';

const Logout = () => {
    const router = useRouter();
    const isLoggedIn = false;
    // const { isLoggedIn, logout, login } = useAuth();

    useEffect(() => {
        // Ensure login has completed before triggering logoutUser
        const fetchData = async () => {
            logoutUser();
        };

        fetchData();
    }, []); // Include login and logout as dependencies

    const logoutUser = () => {
        axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:4500/authentication/logout',
        }).then((res) => {
            if (/^20900/.test(res.data)) {
                router.push('/user/login');
            }
        });
    };

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <p>Welcome! You are logged in.</p>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <div>
                    <p>Please log in:</p>
                </div>
            )}
        </div>
    );
};

export default Logout;


/*
import { useEffect } from 'react';
import { useAuth } from './api/AuthContext';
import {useRouter} from 'next/router'

import axios from "axios";

const Logout = () => {
    const router = useRouter()
    const { isLoggedIn, logout } = useAuth();

    // Use useEffect to perform login when the component mounts
    useEffect(() => {
        logoutUser(); // You can replace this with your actual login logic
    }, []); // The empty dependency array ensures the effect runs only once on mount

    const logoutUser = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:4500/authentication/logout"
        }).then(res => {
            if (/^20900/.test(res.data)) {
                router.push("/user/login");
            }
        })
    };

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <p>Welcome! You are logged in.</p>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <div>
                    <p>Please log in:</p>
                </div>
            )}
        </div>
    );
};

export default Logout;

*/