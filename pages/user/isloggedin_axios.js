// profile.js
import { useState, useEffect } from "react";
import axios from 'axios';

export default function IsLoggedIn() {
    const [username, setUserName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios({
                    method: "get",
                    withCredentials: true,
                    url: "http://localhost:4500/user"
                });

                if ((res.data.firstname !== undefined) && (res.data.lastname !== undefined)) {
                    setUserName(`${res.data.firstname}`);
                } else {
                    setUserName(`WildAlmonds`);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs once when the component mounts

    // Return an object with username and a boolean indicating if the user is logged in
    return {
        username,
        isLoggedIn: username !== 'Login' && username !== 'WildAlmonds',
    };
}