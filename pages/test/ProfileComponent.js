//ProfileComponent
import { useProfileData } from "../user/profileUtils";  // Update with the correct path

const ProfileComponent = () => {
    const { username, user_id, isLoggedIn } = useProfileData();

    return (
        <div>
            <h1>User Profile</h1>
            <p>User ID: {user_id}</p>
            {isLoggedIn ? (
                <>
                    <p>Welcome, {username}!</p>
                    <p>User ID: {user_id}</p>
                </>
            ) : (
                <p>Please log in to view your profile.</p>
            )}
        </div>
    );
};

export default ProfileComponent;
