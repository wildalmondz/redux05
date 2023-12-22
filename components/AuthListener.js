"use strict";
// AuthListener.tsx
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var store_1 = require("../src/redux/store");
var AuthListener = function () {
    var authState = (0, store_1.useAppSelector)(function (state) { return state.authReducer.value; });
    (0, react_1.useEffect)(function () {
        // Your logic to handle state changes and update the UI
        console.log("Auth state changed:", authState);
        // Add your UI update logic here
    }, [authState]);
    return null; // This component doesn't render anything, it's just a listener
};
exports.default = AuthListener;
