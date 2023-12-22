// AuthExampleComponent.js
import React, { useEffect } from 'react';
import { useAuth } from '../api/AuthContext';

const AuthExampleComponent = () => {
    const { isLoggedIn, login, logout } = useAuth();

    const handleLogin = () => {
        login();
    };

    const handleLogout = () => {
        logout();
    };

    // Use useEffect to subscribe to changes in isLoggedIn
    useEffect(() => {
        // You can perform any side effect or re-render the component when isLoggedIn changes
        console.log('isLoggedIn changed:', isLoggedIn);
    }, [isLoggedIn]); // Re-run the effect whenever isLoggedIn changes

    return (
        <div>
            <h1>Authentication Example</h1>
            <p>User is {isLoggedIn ? 'logged in' : 'logged out'}</p>
            <button onClick={handleLogin} disabled={isLoggedIn}>
                Log In
            </button>
            <button onClick={handleLogout} disabled={!isLoggedIn}>
                Log Out
            </button>
        </div>
    );
};

export default AuthExampleComponent;
