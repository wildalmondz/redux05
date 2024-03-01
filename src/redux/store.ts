// redux/store.ts

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth-slice';
import counterReducer from './features/counter-slice'; // Import the new slice
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
    authReducer,
    counterReducer,
});

// reducer is a function that takes in an action and the previous state and makes changes to that state
// returning the value of the new state
export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch(); // Add useDispatch




/*
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth-slice';
import alertReducer from "./features/alert-slice";
import {TypedUseSelectorHook, useSelector} from "react-redux";

const rootReducer = combineReducers({
    authReducer,
    alertReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch  = ReturnType<typeof store.dispatch>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// export default store;


 */



/*
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth-slice"
import messageReducer from "./features/messageSlice";
import {TypedUseSelectorHook, useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
        authReducer,
        messageReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch  = ReturnType<typeof store.dispatch>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

 */
