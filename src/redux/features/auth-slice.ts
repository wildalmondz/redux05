// auth-slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    value: AuthState;
};

type AuthState = {
    isAuth: boolean;
    username: string;
    user_id: number;
    uid: string;
    isModerator: boolean;
    isLoggedIn: boolean;
    profile: string;
};

const initialState = {
    value: {
        isAuth: false,
        username: "",
        user_id: 0,
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
                user_id: 0,
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
        updateProfile: (state, action: PayloadAction<{ username: string; user_id: number, isLoggedIn: boolean }>) => {
            state.value.username = action.payload.username;
            state.value.user_id = action.payload.user_id;
            state.value.isLoggedIn = action.payload.isLoggedIn;
        },
    },
});

export const { logIn, logOut, toggleModerator, updateProfile } = auth.actions;
export default auth.reducer;