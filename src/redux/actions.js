// actions.js
import { createAsyncThunk } from '@reduxjs/toolkit';

export const resetMessage = createAsyncThunk('resetMessage', async (_, { getState, dispatch }) => {
    // Your asynchronous logic here
    const state = getState();
    // Example: Make an API call using axios
    const response = await fetch('your-api-endpoint');
    const data = await response.json();

    // Dispatch another action if needed
    dispatch(anotherAction(data));

    return data;
});

export const anotherAction = (payload) => {
    // Your action logic here
    return {
        type: 'ANOTHER_ACTION',
        payload,
    };
};
