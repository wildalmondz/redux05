import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBoard02 from '../home/MessageBoard02';
import { resetMessage } from '../../src/redux/actions'; // Assuming resetMessage is exported from the MessageBoard file
import { updateProfile } from '../../src/redux/features/auth-slice'; // Adjust the path accordingly

const MessageBoardTestComponent = () => {
    const dispatch = useDispatch();
    const { username } = useSelector((state) => state.authReducer.value);

    const [newText, setNewText] = useState('');

    useEffect(() => {
        // Simulating an asynchronous action, like fetching user data
        const fetchData = async () => {
            try {
                // Assuming you have an API to fetch user data
                const userData = await fetchUserData(); // Implement this function
                dispatch(updateProfile(userData.username));
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [dispatch]);

    const handleResetMessage = () => {
        dispatch(resetMessage());
    };

    const handleTextChange = (event) => {
        setNewText(event.target.value);
    };

    const handleSetText = () => {
        // Trigger an action to update the text in your MessageBoard02 component
        // Use the setNewText value or any other logic you prefer
    };

    return (
        <div>
            <MessageBoard02 text={`Hello, ${newText || username}!`} onResetMessage={handleResetMessage} />
            <div>
                <input type="text" value={newText} onChange={handleTextChange} />
                <button onClick={handleSetText}>Set Text</button>
            </div>
        </div>
    );
};

export default MessageBoardTestComponent;

