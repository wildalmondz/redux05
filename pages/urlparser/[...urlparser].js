// pages/categories/[...urlparser].js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Urlparser({ blogContent, structuredUrl }) {
    const router = useRouter();

    useEffect(() => {
        // Display an alert with the URL path elements
        if (structuredUrl != undefined) { alert(JSON.stringify(structuredUrl)); }
        // Check if structuredUrl.post exists before accessing its properties
        if (structuredUrl && structuredUrl.post !== null) {
            router.push(
                `/blogs/${structuredUrl.type}/${structuredUrl.slug}/${structuredUrl.post}`
            );
        }
    }, [structuredUrl, router]);

    return (
        <div>
            <p>{blogContent}</p>
        </div>
    );
}

export async function getStaticProps({ params }) {
    const { urlparser } = params;

    const structuredUrl = {
        type: urlparser[0] || '',
        slug: urlparser[1] || '',
        post: urlparser[2] || null,
    };

    return {
        props: {
            structuredUrl,
        },
    };
}

export async function getStaticPaths() {
    const categoriesData = [];
    const categories = categoriesData.map((category) => category.slug);

    const paths = categories.map((category) => ({
        params: { urlparser: [category] },
    }));

    return {
        paths,
        fallback: false,
    };
}