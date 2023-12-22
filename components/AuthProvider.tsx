// AuthProvider.tsx

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";

type AuthProviderProps = {
    children: ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default AuthProvider;