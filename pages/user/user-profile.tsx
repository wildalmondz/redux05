// user-profile.tsx

"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../src/redux/store";
import { updateProfile } from "@/redux/features/auth-slice";

export default function UserProfile() {
    const [newProfile, setNewProfile] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const { username, isAuth, isModerator } = useAppSelector(
        (state) => state.authReducer.value
    );

    const onUpdateProfile = () => {
        // Assuming you have an action like `updateProfile` in your auth-slice
        dispatch(updateProfile(newProfile));
    };

    return (
        <div>
            <h2>User Profile</h2>
            <p>
                <span><strong>Username:</strong> {username}
                <strong>IsAuth</strong> {isAuth}</span>
            </p>
            {isAuth && (
                <>
                    <p>
                        <strong>Is Moderator:</strong> {isModerator ? "Yes" : "No"}
                    </p>
                    <label>
                        New Profile:
                        <input
                            type="text"
                            value={newProfile}
                            onChange={(e) => setNewProfile(e.target.value)}
                        />
                    </label>
                    <button onClick={onUpdateProfile}>Update Profile</button>
                </>
            )}
        </div>
    );
}
