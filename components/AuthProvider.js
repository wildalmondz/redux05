"use strict";
// AuthProvider.tsx
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var store_1 = require("../src/redux/store");
var AuthProvider = function (_a) {
    var children = _a.children;
    return <react_redux_1.Provider store={store_1.store}>{children}</react_redux_1.Provider>;
};
exports.default = AuthProvider;
