//userTest/index.old

import React, { useEffect, useState } from 'react';
import {useAppSelector} from "../../src/redux/store";
import { useProfileData, fetchUserProfile } from "../user/profileUtils";

const UserDetails = ({ results }) => {
    const [userDetails, setUserDetails] = useState(null);

    const { user_id } = useProfileData();

    useEffect(() => {
        // Fetch user profile data when the component mounts
        fetchUserProfile();
    }, []); // Empty dependency array means this effect runs once when the component mounts


    const userId = useAppSelector((state) => state.authReducer.value.user_id);

    return (
        <div>
            <h1>    UserId is not defined here:        {user_id}</h1>
        </div>
    );
};

export default UserDetails;
