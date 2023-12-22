// Profile.js

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { updateProfile } from "@/redux/features/auth-slice";
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Profile() {
    const dispatch = useDispatch();
    const authState = useAppSelector((state) => state.authReducer.value);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios({
                    method: "get",
                    withCredentials: true,
                    url: "http://localhost:4500/user"
                });

                if ((res.data.firstname !== undefined) && (res.data.lastname !== undefined)) {
                    const username = `${res.data.firstname} ${res.data.lastname}`;
                    // Dispatch an action to update the Redux state
                    dispatch(updateProfile(username));
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

    const handleLoginClick = () => {
        // Navigate to the 'user/login' path
        router.push('/user/login');
    };

    if (loading) {
        // Loading state while data is being fetched
        return <div></div>;
    }

    return (
        <div>
            {authState.username !== "" ? (
                <span>{'' + authState.username + ''}</span>
            ) : (
                <span onClick={handleLoginClick} style={{ cursor: 'pointer' }}>Login</span>
            )}
        </div>
    );
}
