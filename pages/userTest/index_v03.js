// components/UserDetails.js
import React, { useState, useEffect } from 'react';
import axios from "axios";

const UserDetails = ({ results }) => {

    const [verifyData, setVerifyData] = useState([]);

    useEffect(() => {
        // Ensure login has completed before triggering logoutUser
        const fetchData = async () => {
            verifyUser();
        };
        fetchData();
    }, []); // Include login and logout as dependencies

    const verifyUser = () => {
        axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:4500/admin/username',
        }).then((res) => {
            setVerifyData(res);
            alert(verifyData);
        });
    };

    return (
        <div>
            <h1>User Details</h1>
            <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
    );
};

export default UserDetails;