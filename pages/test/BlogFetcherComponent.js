import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { BlogContext } from './BlogContext';

const BlogFetcherComponent = () => {
    const { setBlogData } = useContext(BlogContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4500/blog/testid');
                const data = response.data.results;
                setBlogData(data);
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };

        fetchData();
    }, [setBlogData]);

    return null; // You can render something meaningful if needed
};

export default BlogFetcherComponent;
