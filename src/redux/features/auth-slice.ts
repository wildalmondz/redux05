// auth-slice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    value: AuthState;
};

type AuthState = {
    isAuth: boolean;
    username: string;
    uid: string;
    isModerator: boolean;
    profile: string;
};

const initialState = {
    value: {
        isAuth: false,
        username: "",
        uid: "",
        profile: "",
        isModerator: false,
    } as AuthState,
} as InitialState;

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: () => initialState,
        logIn: (state, action: PayloadAction<string>) => {
            state.value = {
                isAuth: true,
                username: action.payload,
                uid: action.payload,
                isModerator: false,
                profile: action.payload,
            };
        },
        toggleModerator: (state) => {
            state.value.isModerator = !state.value.isModerator;
        },
        updateProfile: (state, action: PayloadAction<string>) => {
            state.value.username = action.payload;
            state.value.profile = action.payload;
        },
    },
});

export const { logIn, logOut, toggleModerator, updateProfile } = auth.actions;
export default auth.reducer;