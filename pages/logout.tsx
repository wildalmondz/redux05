// Logout.tsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';

import { useAuth } from './api/AuthContext';

const Logout = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { logout } = useAuth(); // Correctly import logout from useAuth

    useEffect(() => {
        const fetchData = async () => {
            await logoutUser();
        };

        fetchData();
    }, []); // Include logoutUser as dependency

    const logoutUser = async () => {
        await axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:4500/authentication/logout',
        }).then((res) => {
            if (/^20900/.test(res.data)) {
                // Use AuthContext's logout function
                logout();
                router.push('/user/login');
            }
        });
    };

    return (
        <div>
            <div>
                <p>Welcome! You are logged in.</p>
                <button onClick={logoutUser}>Logout</button>
            </div>
        </div>
    );
};

export default Logout;
