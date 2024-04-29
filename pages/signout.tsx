import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../src/redux/features/auth-slice';
import axios from "axios";

const Signout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                await axios({
                    method: 'get',
                    withCredentials: true,
                    url: 'http://localhost:4500/authentication/logout',
                });
                dispatch(logOut());
            } catch (error) {
                console.error('Error during logout:', error);
            }
        };

        logoutUser();
    }, [dispatch]); // Include dispatch as the only dependency

    return (
        <div>
            <div>
                <p>Logging out...</p>
            </div>
        </div>
    );
};

export default Signout;
