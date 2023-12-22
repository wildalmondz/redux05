// profile.js
import { useAppSelector} from "../../src/redux/store";
import LogIn from "./log-in";

export default function Isloggedin() {

    const username = useAppSelector((state) => state.authReducer.value.username);
    const isModerator = useAppSelector((state) => state.authReducer.value.isModerator);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between" >
            <LogIn />
            <h1> Username: {username}</h1>
            {isModerator && <h1> This User is a Moderator</h1>}
        </main>
    )
}

/*
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

 */