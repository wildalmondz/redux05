"use strict";
// redux/store.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppSelector = exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var auth_slice_1 = require("./features/auth-slice");
var react_redux_1 = require("react-redux");
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        authReducer: auth_slice_1.default,
    },
});
// console.log('\n\n\n\n HERE \n\n\n' + typeof exports.store.dispatch);
exports.useAppSelector = react_redux_1.useSelector;
