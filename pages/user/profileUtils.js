import { useEffect } from "react";
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
            console.log('username in fetchUserProfile' + username)
            // Dispatch an action to update the Redux state
            dispatch(updateProfile(username));
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
        isLoggedIn: authState.isLoggedIn || false,
    };
};
