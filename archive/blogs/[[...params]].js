
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { blogHandler } from "../../pages/api";

function Blogs() {

    const router = useRouter();
    // set params to an empty array to avoid build errors
    const { params = [] } = router.query;
    console.log(params);

    let findBlog = null;

    const [results, setResults] = useState('Loading...');
    const [foundBlog, setFoundBlog] = useState(0);


    if (params.length === 3) {
        return (
            <h1>
                Viewing blog article for type [{params[0]}] slug [{params[1]}] article [{params[2]}]
            </h1>
        )
    } else if ((params.length === 2) && (foundBlog === 0)) {

        async function getCompanyBlogs() {

            findBlog = await blogHandler(`http://localhost:4500/blog/v4/${params[0]}/${params[1]}`);
            console.log(JSON.stringify('This is it! ' + JSON.stringify(findBlog)));
            setResults(findBlog);
            setFoundBlog(1);
            return(findBlog);
        }
        const foundCompanyBlogs = getCompanyBlogs();
        console.log('This is not it! ' + JSON.stringify(foundCompanyBlogs));


        return (
        <>
            <h1>Viewing blogs for type [{params[0]}] slug [{params[1]}]</h1>
            {JSON.stringify(results)}

        </>
        )
    } else if (params.length === 1) {
        return <h1>Viewing blogs for type {params[0]}</h1>
    }

    return (
    <>
        <h1>Blogs Home Page</h1>
        <p>{JSON.stringify(results)}</p>
    </>
    )
}

export default Blogs


/*
export async function getStaticPaths({ params }) {
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
        type: blogs[0] || '',
        slug: blogs[1] || undefined,
        post: blogs[2] || undefined,
    };

    if (!structuredUrl.slug) {
        console.log('No slug');
        return {
            notFound: true,
        };
    }

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
        console.log('No post found for article ' + structuredUrl.post);

        return {
            notFound: true,
        };
    }

    return {
        props: {
            blogContent,
            structuredUrl,
            companyDetails,
            slugListArray,
            blogListArray,
            idFound,
            likeCount,
        },
    };
}
 */