// pages/categories/[...blogs].js

import { useEffect, useState } from 'react';
import { blogHandler } from "../../pages/api";
import BlogHeader from "./BlogHeader";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useRouter } from 'next/router';


const BlogItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: '1px solid #000', // Example border for visualization
}));

export default function Blogs({ blogContent, structuredUrl, companyDetails, slugListArray, blogListArray, idFound, likeCount }) {
    // Use state to track whether parameters are defined
    const [parametersDefined, setParametersDefined] = useState(false);
    const [idSearched, setIdSearched] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check if the necessary parameters are defined

        if (blogContent && companyDetails && slugListArray && blogListArray) {
            setParametersDefined(true);
        }
        if (idFound === true) {
            router.push(`/blogs/${structuredUrl.type}/${structuredUrl.slug}/${structuredUrl.post}`);
        }

    }, [blogContent, companyDetails, slugListArray, blogListArray, idFound]);

    return (
        <div>
            {parametersDefined && (
                <>
                    <BlogHeader
                        companyDetails={companyDetails}
                        slugListArray={slugListArray}
                        blogListArray={blogListArray}
                        blogContent={blogContent}
                        urlparse={structuredUrl}
                        currentId={structuredUrl.post}
                        likeCount={likeCount}
                    />
                </>
            )}
        </div>
    );
}

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

    // const blogData = await blogHandler(`http://localhost:4500/blog/v2/fastfood/chicken`);
    /*
    if (findBlog != 'null') {
        companyDetails = findBlog.find((entry) => entry.company);
        slugListArray = findBlog.find((entry) => entry.slugs);
        blogListArray = findBlog.find((entry) => entry.blogs);
    }

     */

    // console.log('Here at blogData! ' + JSON.stringify(companyDetails));


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

// this must be here unsure of why getStaticPaths is greyed in the IDE
export async function getStaticPaths() {
    const blogsData = await blogHandler(`http://localhost:4500/blog/post/fastfood/chicken/33`);
    const blogs = blogsData.map(category => category.slug);

    const paths = blogs.map((category) => ({
        params: { blogs: [category] },
    }));

    return {
        paths,
        fallback: false,
    };
}