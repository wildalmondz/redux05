import React, { useContext } from 'react';
import { BlogContext } from './BlogContext';

const BlogDisplayComponent = () => {
    const { blogData } = useContext(BlogContext);

    return (
        <div>
            <h2>Blog Data</h2>
            {blogData.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                </div>
            ))}
        </div>
    );
};

export default BlogDisplayComponent;
