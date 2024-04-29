import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { blogHandler } from "../../pages/api";
import BlogHeader from "./BlogHeader";

function Blogs() {
    const router = useRouter();
    // set params to an empty array to avoid build errors
    const { params = [] } = router.query;

    const [results, setResults] = useState('Loading...');
    const [foundCompanyBlog, setFoundCompanyBlog] = useState(0);
    const [foundBlog, setFoundBlog] = useState(0);
    const [blogContent, setBlogContent] = useState(0);
    const [blogLikes, setBlogLikes] = useState(0);
    const [companyDetails, setCompanyDetails] = useState('');
    const [slugList, setSlugList] = useState('');
    const [blogList, setBlogList] = useState('');
    const [structuredUrl, setStructuredUrl] = useState('');

    //
    useEffect(() => {
        if (params.length === 2 && foundCompanyBlog === 0) {
            const getCompanyBlogs = async () => {
                try {
                    const findCompanyBlog = await blogHandler(`http://localhost:4500/blog/v4/${params[0]}/${params[1]}`);
                    setResults(findCompanyBlog);
                    setFoundCompanyBlog(1);
                } catch (error) {
                    console.error('Error fetching company blogs:', error.message);
                }
            };
            getCompanyBlogs();
        }
    }, [params, foundCompanyBlog]);

    // user provided a post id or we were able to find one
    useEffect(() => {
        if ((params.length === 3) && (foundBlog === 0)) {

            setStructuredUrl({
                type: params[0] || '',
                slug: params[1] || undefined,
                post: params[2] || undefined,
            });

            const getCompanyBlogs = async () => {
                try {
                    const findBlogData = await blogHandler(`http://localhost:4500/blog/post/${params[0]}/${params[1]}/${params[2]}`);
                    setResults(findBlogData);
                    setFoundBlog(1);


                    // const blogContent = findBlogData[0]?.blog || null;

                    if (findBlogData[0]?.blog) { setBlogContent(findBlogData[0]?.blog) };
                    if (findBlogData[0]?.likes) { setBlogLikes(findBlogData[0]?.likes) };
                    console.log('Find blog data!' + JSON.stringify(findBlogData));

                    const blogData = await blogHandler(`http://localhost:4500/blog/v2/${params[0]}/${params[1]}`);

                    if (blogData) {
                        setCompanyDetails(blogData.find((entry) => entry.company));
                        setSlugList(blogData.find((entry) => entry.slugs));
                        setBlogList(blogData.find((entry) => entry.blogs));
                    };

                } catch (error) {
                    console.error('Error fetching company blogs:', error.message);
                }
            };
            getCompanyBlogs();
        }
    }, [params, foundCompanyBlog, foundBlog, blogContent]);

    /*
                <h1>
                Viewing blog article for type [{params[0]}] slug [{params[1]}] article [{params[2]}]
            </h1>
                <br/>
                <span>Likes: [ {blogLikes} ]</span>
                <br/>
            <p>
                {blogContent}
            </p>
     */


    if (params.length === 3) {
        return (
            <>
                <BlogHeader
                    companyDetails={companyDetails}
                    slugListArray={slugList}
                    blogListArray={blogList}
                    blogContent={blogContent}
                    urlparse={structuredUrl}
                    currentId={structuredUrl.post}
                    likeCount={blogLikes}
                />
            </>
        );
    } else if (params.length === 2 && foundCompanyBlog === 0) {
        return (
            <>
                <h1>Viewing blogs for type [{params[0]}] slug [{params[1]}]</h1>
                <p>Loading...</p>
            </>
        );
    } else if (params.length === 2 && foundCompanyBlog === 1) {

        let data;

        if (results && results[0]) { data = results; }

        if ((data && data.results[0].id) && (typeof data.results[0].id == 'number')) {
            //alert('redirect here!')
            router.push(`/blogs/${params[0]}/${params[1]}/${data.results[0].id}`);
        }

        return (
            <>
                <h1>Viewing blogs for type [{params[0]}] slug [{params[1]}]</h1>
                <p>{JSON.stringify(results)}</p>
                <h2>Found Company Blog? {foundCompanyBlog}</h2>
                {data ? <h3>{data.results[0].id}</h3> : null}
            </>
        );
    } else if (params.length === 1) {
        return <h1>Viewing blogs for type {params[0]}</h1>;
    }

    return (
        <>
            <h1>Blogs Home Page</h1>
            <p>{JSON.stringify(results)}</p>
        </>
    );
}

export default Blogs;


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