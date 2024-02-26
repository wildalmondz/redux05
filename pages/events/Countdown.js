import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Countdown = ({ expires, curLocked, setCurLocked }) => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [curExpired, setCurExpired] = useState(null);
    const endTime = new Date(expires).getTime();

    const formatDate = (date) => {
        const formattedDateString = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${
            date.getDate().toString().padStart(2, '0')
        }/${
            date.getFullYear()
        } ${
            date.getHours().toString().padStart(2, '0')
        }:${
            date.getMinutes().toString().padStart(2, '0')
        }`;
        setCurExpired(formattedDateString);
    };

    const calculateCountdown = (currentTime) => {
        const timeDifference = endTime - new Date(currentTime).getTime();

        if (timeDifference > 0) {
            const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const remainingHours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            setDays(remainingDays);
            setHours(remainingHours);
            setMinutes(remainingMinutes);
            setSeconds(remainingSeconds);
        } else {
            setDays(0);
            setHours(0);
            setMinutes(0);
            setSeconds(0);
            formatDate(new Date(endTime));
            setCurLocked('Locked');
        }
    };

    useEffect(() => {
        if (curExpired === null) {
            const fetchServerTime = async () => {
                try {
                    const response = await axios.get('http://localhost:4500/games/servertime');
                    const { data } = response;
                    const currentTime = data.results;
                    calculateCountdown(currentTime);
                } catch (error) {
                    console.error('Error fetching server time:', error);
                }
            };

            fetchServerTime(); // Fetch server time before setting up the interval

            const countdownInterval = setInterval(() => {
                fetchServerTime(); // Fetch server time on each interval
            }, 1000);

            return () => {
                clearInterval(countdownInterval);
            };
        }
    }, [curExpired]);

    return (
    <>
        {(curExpired !== null) ? (
            <div id="clockstart">
                <span>Expired: {curExpired} {' '}</span>
            </div>
        ) : (
            <div>
                <span>Expires {' '}</span>
                <span>{days}d </span>
                <span>{hours}h </span>
                <span>{minutes}m </span>
                {((hours === 0 && minutes < 15) || (hours === 0 && minutes > 15)) && <span>{seconds}s </span>}
            </div>
        )}
    </>
    );
};

export default Countdown;