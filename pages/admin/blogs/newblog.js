// pages/admin/newblog.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { blogHandler } from "../../../pages/api";

// Your React component
const MyComponent = () => {
    // Get the router instance
    const router = useRouter();

    // Extract path items as variables
    const { pathname } = router;
    const pathItems = pathname.split('/').filter(Boolean); // Remove empty strings

    // Use the path items as variables
    const firstPathItem = pathItems[0];
    const secondPathItem = pathItems[1];
    const thirdPathItem = pathItems[2];

    return (
        <div>
            <p>First Path Item: {firstPathItem}</p>
            <p>Second Path Item: {secondPathItem}</p>
            <p>Third Path Item: {thirdPathItem}</p>
        </div>
    );
};

export default MyComponent;





/*
pass the companyId parameter to this component
 */



/*
export default function Createblog({ }) {
    // Use state to track whether parameters are defined
    const [parametersDefined, setParametersDefined] = useState(false);
    const [idSearched, setIdSearched] = useState(false);

    const router = useRouter();

    /*
    useEffect(() => {
        // Check if the necessary parameters are defined

        if (blogContent && companyDetails && slugListArray && blogListArray) {
            setParametersDefined(true);
        }
        if (idFound === true) {
            router.push(`/blogs/${structuredUrl.type}/${structuredUrl.slug}/${structuredUrl.post}`);
        }

    }, [blogContent, companyDetails, slugListArray, blogListArray, idFound]);

     */

    /*
                {parametersDefined && (
                <>
                    <BlogHeader
                        companyDetails={companyDetails}
                        slugListArray={slugListArray}
                        blogListArray={blogListArray}
                        blogContent={blogContent}
                        urlparse={structuredUrl}
                        currentId={structuredUrl.id}
                        likeCount={likeCount}
                    />
                </>
            )}
     */
/*
    return (
        <div>
            <h1>Hello Create Blog</h1>
        </div>
    );
}
*/

/*
export async function getStaticProps({ params }) {
    let companyDetails = {};
    let slugListArray = {};
    let blogListArray = {};

    let results;
    let blogContent;
    let likeCount;
    let findBlog = null;
    let idFound = false;

    const { blogs } = params;

    const structuredUrl = {
        company_id: '50',
    };
    /*
    const structuredUrl = {
        id: blogs[0] || '',
    };



    if (!structuredUrl.id) {
        console.log('No slug');
        return {
            notFound: true,
        };
    }

 */

    /*
    if (!structuredUrl.post) {
        // user did not have a particular blog id to provide
        console.log('No post');

        findBlog = await blogHandler(`http://localhost:4500/blog/v4/${structuredUrl.type}/${structuredUrl.slug}`);
        console.log(JSON.stringify('This is it! ' + JSON.stringify(findBlog)));

        const extractedValue = findBlog.results[0].id || null;
        // console.log(extractedValue); // Output: 65
        structuredUrl.post = extractedValue;

        //set a state that the id is found that redirects
        results = await blogHandler(`http://localhost:4500/blog/post/${structuredUrl.type}/${structuredUrl.slug}/${extractedValue}`);
        idFound = true;
        blogContent = results[0]?.blog || null;
        likeCount = results[0]?.likes|| null;

        console.log('likeCount' + likeCount);
    }



    try {
        // console.log(`Here at blogData`);
        const blogData = await blogHandler(`http://localhost:4500/blog/v2/${structuredUrl.type}/${structuredUrl.slug}/`);

        companyDetails = blogData.find((entry) => entry.company);
        slugListArray = blogData.find((entry) => entry.slugs);
        blogListArray = blogData.find((entry) => entry.blogs);
    } catch (error) {
        console.error('Error fetching blog data:', error.message);
    }

    results = await blogHandler(`http://localhost:4500/blog/post/${structuredUrl.type}/${structuredUrl.slug}/${structuredUrl.post}`);
    blogContent = results[0]?.blog || undefined;
    likeCount = results[0]?.likes|| null;

    if (likeCount != null) {
        console.log('likeCount: ' + likeCount);
    }




    if (!blogContent) {
        console.log('No post found for article ' + structuredUrl.id);

        return {
            notFound: true,
        };
    }

    return {
        props: {
            structuredUrl,
            idFound,
        },
    };
}
     */


/*
// this must be here unsure of why getStaticPaths is greyed in the IDE
export async function getStaticPaths() {
    const blogData = await blogHandler(`http://localhost:4500/editblog/50`);
    // const blogs = blogsData.map(category => category.slug);
``
    /*
    const paths = blogs.map((category) => ({
        params: { blogs: [category] },
    }));

     */
/*
    return {
        blogData,
        fallback: false,
    };
}
*/