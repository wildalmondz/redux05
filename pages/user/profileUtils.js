import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../src/redux/store";
import { updateProfile } from "../../src/redux/features/auth-slice";
import axios from 'axios';

export const fetchUserProfile = async (dispatch) => {
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
            // Dispatch an action to update both username and user_id the Redux state
            // dispatch(updateProfile({ username, user_id }));
            dispatch(updateProfile(user_id));
        }
    } catch (err) {
        console.log(err);
    }
};

export const useProfileData = () => {
    const authState = useAppSelector((state) => state.authReducer.value);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchUserProfile(dispatch);
    }, [dispatch]);

    return {
        username: authState.username || '',
        user_id: authState.user_id || '',
        isLoggedIn: authState.isLoggedIn || false,
    };
};

const ProfileComponent = () => {
    const { username, user_id, isLoggedIn } = useProfileData();

    return (
        <div>
            <h2>User Profile</h2>
            <p>Username: {username}</p>
            <p>User ID: {user_id}</p>
            <p>Is Logged In: {isLoggedIn ? 'Yes' : 'No'}</p>
        </div>
    );
};

export default ProfileComponent;
