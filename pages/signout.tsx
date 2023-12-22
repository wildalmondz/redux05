// components/Logout.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../pages/api/AuthContext';
import { logOut } from '../src/redux/features/auth-slice';
import axios from "axios";

const Signout = () => {
    const dispatch = useDispatch();
    const { logout } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            await logoutUser();
        };

        fetchData();
    }, [logout]); // Include logout as dependency

    const logoutUser = async () => {
        try {
            // Your backend logout logic, make a request to your Express logout route
            // For example:
            // await axios.get('http://localhost:4500/authentication/logout', { withCredentials: true });

            const logoutUser = () => {
                axios({
                    method: 'get',
                    withCredentials: true,
                    url: 'http://localhost:4500/authentication/logout',
                }).then((res) => {
                    if (/^20900/.test(res.data)) {
                        // router.push('/user/login');
                        dispatch(logOut());
                    }
                });
            };

            logoutUser();

            // Simulating a successful logout

        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div>
            <div>
                <p>Logging out...</p>
            </div>
        </div>
    );
};

export default Signout;
