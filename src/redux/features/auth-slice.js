"use strict";
// auth-slice.ts
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.toggleModerator = exports.logOut = exports.logIn = exports.auth = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    value: {
        isAuth: false,
        username: "",
        uid: "",
        isModerator: false,
    },
};
exports.auth = (0, toolkit_1.createSlice)({
    name: "auth",
    initialState: initialState,
    reducers: {
        logOut: function () { return initialState; },
        logIn: function (state, action) {
            state.value = {
                isAuth: true,
                username: action.payload,
                uid: "de9320430safde",
                isModerator: false,
            };
        },
        toggleModerator: function (state) {
            state.value.isModerator = !state.value.isModerator;
        },
        updateProfile: function (state, action) {
            state.value.username = action.payload;
        },
    },
});
exports.logIn = (_a = exports.auth.actions, _a.logIn), exports.logOut = _a.logOut, exports.toggleModerator = _a.toggleModerator, exports.updateProfile = _a.updateProfile;
exports.default = exports.auth.reducer;
