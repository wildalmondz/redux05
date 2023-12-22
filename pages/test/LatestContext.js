// LatestContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const LatestContext = createContext();

export const LatestProvider = ({ children, initialData }) => {
    const [data, setData] = useState(initialData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('./api/test');
                const blogData = await response.json();
                setData(blogData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (!initialData) {
            fetchData();
        }
    }, [initialData]);

    return (
        <LatestContext.Provider value={data}>
            {children}
        </LatestContext.Provider>
    );
};

export const useLatestData = () => {
    return useContext(LatestContext);
};
