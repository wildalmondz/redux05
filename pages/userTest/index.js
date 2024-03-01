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

    /*
     const login = () => {
        axios({
            method: "post",
            data: {
                email: loginUsername,
                password: loginPassword
            },
            withCredentials: true,
            url: "http://localhost:4500/authentication/login_v3"
        }).then(res => {
            if (/^20001/.test(res.data)) {
                // Use Redux to log in

                console.log('\n\n Res Data??? \n\n' + res.data);

                // Parse the JSON string
                // const jsonObject = JSON.parse(res.data.split(':')[1]);

                // console.log(jsonObject);



                // Use a regular expression to extract the name
                const matchName = res.data.match(/\[([^\]]+)\]/);
                console.log('matchName? [' + matchName.user_id + ']')
                let extractedName = "";
                let user_id = "";


                if (matchName && matchName[1]) {
                    extractedName = matchName[1];
                    const jsonObject = JSON.parse(extractedName);

                    // Access the user_id property
                    user_id = jsonObject.user_id;

                    console.log('User id? ' + user_id + '\n\n\n');
                } else {
                    console.log("No name found in the string.");
                }

                dispatch(logIn(extractedName));
                // dispatch(logIn(user_id));
                router.push("/admin/experience");
            }
     */

    const verifyUser = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: 'http://localhost:4500/username',
        }).then((res) => {
            setVerifyData(res);
            alert(JSON.stringify(res));
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