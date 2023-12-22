// MessageBoard.tsx

import React from "react";
import { useAppSelector } from "../../src/redux/store";

const MessageBoard: React.FC = () => {
   const authState = useAppSelector((state) => state.authReducer.value);
   // const alertState = useAppSelector((state) => state.alert.value);

    return (
        <div>
            <p>{authState.username ? authState.username : ""}</p>
        </div>
    );
};

export default MessageBoard;

//             <p>{authState.username ? authState.username : ""}</p>
//             <p>{alertState.username}</p>
//             <p>Message: {message}</p>