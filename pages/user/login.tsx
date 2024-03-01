// Login.js

"use client";


import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logIn, logOut, toggleModerator } from "../../src/redux/features/auth-slice";
import { AppDispatch, useAppSelector } from "../../src/redux/store";
import { useRouter } from 'next/router';

export default function Login() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);

    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

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
        });
    }

    return (
        <div style={{minHeight: '45em'}}>
            <h1>Login</h1>
            <input type="text" name="username" placeholder="username" onChange={e => setLoginUsername(e.target.value)}></input>
            <input type="password" name="password" placeholder="password" onChange={e => setLoginPassword(e.target.value)}></input>
            <button onClick={login}>Login</button>
            <br />
            <div>
                {isAuth && (
                    <>
                        <button onClick={() => dispatch(logOut())}>Log Out</button>
                        <br />
                        <button onClick={() => dispatch(toggleModerator())}>Toggle Moderator Status</button>
                    </>
                )}
            </div>
        </div>
    );
}