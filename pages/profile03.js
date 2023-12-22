// AnyComponent.js
import { useEffect } from 'react';
import { useAuth } from './api/AuthContext';

const AnyComponent = () => {
    const { isLoggedIn, login, logout } = useAuth();

    // Use useEffect to perform login when the component mounts
    useEffect(() => {
        login(); // You can replace this with your actual login logic
    }, []); // The empty dependency array ensures the effect runs only once on mount

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <p>Welcome! You are logged in.</p>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <div>
                    <p>Please log in:</p>
                    {/* You might want to remove the login button, as the login is now performed on component load */}
                </div>
            )}
        </div>
    );
};

export default AnyComponent;
