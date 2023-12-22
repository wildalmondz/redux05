// UserStatus.tsx

import React from "react";
import { useAppSelector } from "@/redux/store";

const UserStatus: React.FC = () => {
    const authState = useAppSelector((state) => state.authReducer.value);

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
