"use client";
// log-in.tsx
import { useState } from "react";
import { logIn, logOut, toggleModerator, updateProfile} from "../../src/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import {AppDispatch, store, useAppSelector} from "@/redux/store";

export default function LogIn () {
    const [username, setUsername ] = useState("");

    // const dispatch = useDispatch<AppDispatch>();
    const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);
    const userId = useAppSelector((state) => state.authReducer.value.user_id);

    /*
    const onClickLogIn = () => {
        // Dispatch both username and userId?
        dispatch(logIn(username));
    };
*/

    /*
    const onClickToggle = () => {
        dispatch(toggleModerator());
    };
*/
    /*
    const onClickLogOut = () => {
        dispatch(logOut());
    };
*/

    return (
        <div>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
            <h4>User Id: {userId}</h4>
            <h4>isAuth: {isAuth}</h4>
        </div>
    )
}