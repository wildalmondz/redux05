// YourNextComponent.js
import React from 'react';
import IsLoggedIn from './isloggedin';

export default function TestLog() {
    const { username, isLoggedIn } = IsLoggedIn();

    return (
        <div>
            <p>Username: {username}</p>
            <p>Logged-in Status: {isLoggedIn ? 'Logged In' : 'Not Logged In'}</p>
        </div>
    );
}
