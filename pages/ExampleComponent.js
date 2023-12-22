import { useAuth } from './api/AuthContext';

const ExampleComponent = () => {
    const { isLoggedIn, login, logout } = useAuth();

    return (
        <div>
            {isLoggedIn ? (
                <p>Welcome! You are logged in.</p>
            ) : (
                <p>Please log in</p>
            )}

            <button onClick={login}>Log In</button>
            <button onClick={logout}>Log Out</button>
        </div>
    );
};

export default ExampleComponent;
