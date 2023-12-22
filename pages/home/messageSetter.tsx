// MessageSetter.tsx
"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setMessage } from "../../src/redux/features/messageSlice";

const MessageSetter: React.FC = () => {
    const dispatch = useDispatch();
    const [message, setMessageState] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessageState(event.target.value);
    };

    const handleSubmit = () => {
        dispatch(setMessage(message));
        setMessageState("");
    };

    return (
        <div>
            <input type="text" value={message} onChange={handleChange} />
            <button onClick={handleSubmit}>Set Message</button>
        </div>
    );
};

export default MessageSetter;
