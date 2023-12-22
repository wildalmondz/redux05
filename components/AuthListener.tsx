// AuthListener.tsx

import { useEffect } from "react";
import { useAppSelector } from "../src/redux/store";

const AuthListener = () => {
    const authState = useAppSelector((state) => state.authReducer.value);

    useEffect(() => {
        // Your logic to handle state changes and update the UI
        console.log("Auth state changed:", authState);
        // Add your UI update logic here
    }, [authState]);

    return null; // This component doesn't render anything, it's just a listener
};

export default AuthListener;
