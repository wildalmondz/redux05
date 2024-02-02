import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [time, setTime] = useState(new Date().toLocaleString());

    useEffect(() => {
        const intervalID = setInterval(() => {
            tick();
        }, 1000);

        return () => {
            clearInterval(intervalID);
        };
    }, []);

    const tick = () => {
        setTime(new Date().toLocaleString());
    };

    return (
        <div className="App-clock">
            <strong>{time}</strong>
        </div>
    );
};

export default Clock;
