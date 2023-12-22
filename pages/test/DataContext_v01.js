// DataContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import {blogHandler} from "@/pages/api";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const blogData = await blogHandler(`http://localhost:4500/blog/testid`);
                setData(blogData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures the effect runs once when the component mounts

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    return useContext(DataContext);
};
