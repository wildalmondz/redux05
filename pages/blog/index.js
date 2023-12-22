// pages/blog.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Blog = () => {
    const router = useRouter();

    useEffect(() => {
        // Redirect to the desired path
        router.push('/categories/fastfood/chicken');
    }, [router]);

    return null; // or any loading component if needed
};

export default Blog;