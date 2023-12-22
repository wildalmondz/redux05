// UserStatus.tsx

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { logIn } from "@/redux/features/auth-slice";

const UserStatus: React.FC = () => {
    const dispatch = useDispatch();
    const authState = useAppSelector((state) => state.authReducer.value);

    useEffect(() => {
        // Check if there is a stored state in local storage
        const storedState = localStorage.getItem("reduxState");
        if (storedState) {
            const parsedState = JSON.parse(storedState);
            // Dispatch an action to update the Redux state with the stored state
            dispatch(logIn(parsedState.username));
        }
    }, [dispatch]);

    useEffect(() => {
        // Save the Redux state to local storage whenever it changes
        localStorage.setItem("reduxState", JSON.stringify(authState));
    }, [authState]);

    return (
        <div>
            <h2>User Status</h2>
            <p>Is Authenticated: {authState.isAuth ? "Yes" : "No"}</p>
            <p>Username: {authState.username}</p>
            <p>Is Moderator: {authState.isModerator ? "Yes" : "No"}</p>
        </div>
    );
};

export default UserStatus;