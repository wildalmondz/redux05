// auth-slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    value: AuthState;
};

type AuthState = {
    isAuth: boolean;
    username: string;
    user_id: string;
    uid: string;
    isModerator: boolean;
    isLoggedIn: boolean;
    profile: string;
};

const initialState = {
    value: {
        isAuth: false,
        username: "",
        user_id: "",
        uid: "",
        profile: "Hello Profile",
        isModerator: true,
        isLoggedIn: false,
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
                user_id: action.payload,
                uid: action.payload,
                isModerator: true,
                profile: "Hello profile",
                isLoggedIn: false
                // profile: action.payload,
            };
        },
        toggleModerator: (state) => {
            state.value.isModerator = !state.value.isModerator;
        },
        updateProfile: (state, action: PayloadAction<{ username: string; user_id: string; isLoggedIn: boolean; }>) => {
            state.value.username = action.payload.username;
            state.value.user_id = action.payload.user_id;
            state.value.isLoggedIn = action.payload.isLoggedIn;
        },
        updateUserId: (state, action: PayloadAction<{ user_id: string }>) => {
            state.value.uid= action.payload.user_id;
        },
    },
});

export const { logIn, logOut, toggleModerator, updateProfile, updateUserId} = auth.actions;
export default auth.reducer;