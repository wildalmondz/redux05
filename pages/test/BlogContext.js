import { createContext, useContext, useState } from 'react';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    const [blogData, setBlogData] = useState([]);

    return (
        <BlogContext.Provider value={{ blogData, setBlogData }}>
            {children}
        </BlogContext.Provider>
    );
};

export const useBlog = () => {
    return useContext(BlogContext);
};
