// profileUtils.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../src/redux/store";
import { updateProfile } from "../../src/redux/features/auth-slice";
import axios from 'axios';

export const fetchUserProfile = async () => {
    try {
        const res = await axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:4500/user"
        });

        if ((res.data.firstname !== undefined) && (res.data.lastname !== undefined)) {
            const username = `${res.data.firstname} ${res.data.lastname}`;
            const user_id = res.data.user_id;
            console.log('username in fetchUserProfile' + username)
            console.log('user_id in fetchUserProfile' + user_id)
            return { username, user_id };
        }
    } catch (err) {
        console.log(err);
    }
};

export const useProfileData = () => {
    const authState = useAppSelector((state) => state.authReducer.value);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const { username, user_id } = await fetchUserProfile();
            if (username && user_id) {
                dispatch(updateProfile({ username, user_id }));
            }
        };

        fetchData();
    }, [dispatch]);

    return {
        username: authState.username || '',
        user_id: authState.user_id || '',
        isLoggedIn: authState.isLoggedIn || false,
    };
};
