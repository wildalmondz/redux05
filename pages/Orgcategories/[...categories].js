/// pages/categories/[...blogs].js

import { blogHandler } from "../../pages/api";

export default function Categories({ blogContent, structuredUrl }) {
    return (
        <div>
            <p>{blogContent}</p>
        </div>
    );
}

/*
            <ul>
                {categoriesArray.map((category, index) => (
                    <li key={index}>{category}</li>
                ))}
            </ul>
 */

export async function getStaticProps({ params }) {
    const { categories } = params;

    const structuredUrl = {
        type: categories[0] || '',
        slug: categories[1] || '',
        post: categories[2] || undefined,
    };

    console.log('In getStaticProps: ' + JSON.stringify(structuredUrl));

    if (!structuredUrl.post) {
        console.log('No post');
        // Return to the default function here
        // Return to the default function here
        return {
            notFound: true,
        };
    }

    const results = await blogHandler(`http://localhost:4500/blog/post/${structuredUrl.type}/${structuredUrl.slug}/${structuredUrl.post}`);
    const blogContent = results[0]?.blog || undefined;



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

/// Add the following getStaticPaths function
export async function getStaticPaths() {
    // Fetch the categories data or use a predefined list
    const categoriesData = await blogHandler(`http://localhost:4500/blog/post/fastfood/chicken/33`);
    const categories = categoriesData.map(category => category.slug); // Adjust based on your API response

    // Generate paths for all categories
    const paths = categories.map((category) => ({
        params: { categories: [category] },
    }));

    return {
        paths,
        fallback: false,
    };
}

// export default Blogs;

/*
function Blogs() {
    const router = useRouter();
    const { categories } = router.query;

    // Check if categories is a single value, and convert it to an array if needed
    const categoriesArray = Array.isArray(categories) ? categories : [categories];

    return (
        <div>
            <h1>Blogs</h1>
            <ul>
                {categoriesArray.map((category, index) => (
                    <li key={index}>{category}</li>
                ))}
            </ul>
        </div>
    );
}

 */