// pages/blog/[...urlparser].js
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { blogHandler } from "../../pages/api";

export default function Categories({ blogContent, structuredUrl }) {
    const router = useRouter();

    useEffect(() => {
        // Check if structuredUrl.post exists before accessing its properties
        if (structuredUrl && structuredUrl.post !== 'null') {
            router.push(`/blogs/${structuredUrl.type}/${structuredUrl.slug}/${structuredUrl.post}`);
        }
    }, [structuredUrl, router]);

    return (
        <div>
            <p>{blogContent}</p>
        </div>
    );
}

export async function getStaticProps({ params }) {
    const { categories } = params;
    let results;
    let blogContent;

    const structuredUrl = {
        type: categories[0] || '',
        slug: categories[1] || '',
        post: categories[2] || null,
    };

    console.log('In getStaticProps: ' + JSON.stringify(structuredUrl));

    if (!structuredUrl.post) {
        // user did not have a particular blog id to provide
        console.log('No post');
        const findBlog = await blogHandler(`http://localhost:4500/blog/v4/${structuredUrl.type}/${structuredUrl.slug}`);

        const extractedValue = findBlog.results[0].id || null;
        console.log(extractedValue); // Output: 65
        structuredUrl.post = extractedValue;

        results = await blogHandler(`http://localhost:4500/blog/post/${structuredUrl.type}/${structuredUrl.slug}/${extractedValue}`);
        blogContent = results[0]?.blog || null;
    }

    if (!blogContent) {
        console.log('No post found for article ' + structuredUrl.post);

        return {
            notFound: true,
        };
    }

    return {
        props: {
            blogContent,
            structuredUrl,
        },
    };
}

export async function getStaticPaths() {
    const categoriesData = await blogHandler(`http://localhost:4500/blog/post/fastfood/chicken/33`);
    const categories = categoriesData.map(category => category.slug);

    const paths = categories.map((category) => ({
        params: { categories: [category] },
    }));

    return {
        paths,
        fallback: false,
    };
}