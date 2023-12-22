// messageSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    value: MessageState;
}


interface MessageState {
    message: string;
}


const initialState: InitialState = {
    value: {
        message: "",
    },
};

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<string>) => {
            state.value.message = action.payload;
        },
    },
});

export const { setMessage } = messageSlice.actions;
export default messageSlice.reducer;


/*
// messageSlice.ts



import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MessageState {
    message: string | null;
}

const initialState: MessageState = {
    message: 'WildAlmonds',
};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        },
        clearMessage: (state) => {
            state.message = null;
        },
    },
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;


 */