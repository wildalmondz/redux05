// components/UserDetails.js
import { useEffect, useState } from 'react';

const UserDetails = ({ results }) => {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4500/admin/username', {
                    credentials: 'include',
                    mode: 'cors',
                    headers: {
                        Accept: 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserDetails(data);
                } else {
                    console.error('Failed to fetch user details');
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>User Details</h1>
            {userDetails ? (
                <pre>{JSON.stringify(userDetails, null, 2)}</pre>
            ) : (
                <p>Loading user details...</p>
            )}
        </div>
    );
};

export default UserDetails;
