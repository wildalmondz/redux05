// DataContext.js
// this is for state sharing
import { createContext, useContext, useEffect, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children, initialData }) => {
    const [data, setData] = useState(initialData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //const response = await fetch('./api/test');
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
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    return useContext(DataContext);
};
