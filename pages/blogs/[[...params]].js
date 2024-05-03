import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { blogHandler } from "../../pages/api";
import BlogHeader from "./BlogHeader";

function Blogs() {
    const router = useRouter();
    // set params to an empty array to avoid build errors
    const { params = [] } = router.query;

    const [results, setResults] = useState('Loading blog content...');
    const [foundCompanyBlog, setFoundCompanyBlog] = useState(0);
    const [foundBlog, setFoundBlog] = useState(0);
    const [blogContent, setBlogContent] = useState('');
    const [blogLikes, setBlogLikes] = useState(0);
    const [companyDetails, setCompanyDetails] = useState('');
    const [slugList, setSlugList] = useState('');
    const [blogList, setBlogList] = useState('');
    const [structuredUrl, setStructuredUrl] = useState({});
    const [urlParse, setUrlParse] = useState({});
    const [parametersDefined, setParametersDefined] = useState(false);
    const [switchCompany, setSwitchCompany] = useState(false);
    const [indexFind, setIndexFind] = useState(0);

    console.log('URL Parse!! ' + JSON.stringify(urlParse));

    if ((parametersDefined === false) && (params[2])) {
        setUrlParse({
            type: params[0] || '',
            slug: params[1] || undefined,
            post: params[2] || undefined,
        });
        setFoundCompanyBlog(0);
        setParametersDefined(true);
    }

    console.log('1. Parameters defined?' + parametersDefined +
        'Structured URL [ ' + JSON.stringify(urlParse) +
        ' ] =>' + params.length);
    console.log('Switch company?' + switchCompany);

    if (switchCompany === true) {
        setUrlParse({
            type: params[0] || '',
            slug: params[1] || undefined,
            post: params[2] || undefined,
        });
        console.log('\n\n\nSwitchCompany\n\n\n' + JSON.stringify(urlParse) + '\n\n\n\n\n');
        setSwitchCompany(false);
    }


    useEffect(() => {
        if (params.length === 2 && foundCompanyBlog === 0) {
            console.log('2. Parameters defined?' + parametersDefined + 'Structured URL [ ' + JSON.stringify(urlParse) + ' ] =>' + params.length);

            const getCompanyBlogs = async () => {
                try {
                    const findCompanyBlog = await blogHandler(`http://localhost:4500/blog/v4/${params[0]}/${params[1]}`);
                    // console.log('3. Company data returned: ' + JSON.stringify(findCompanyBlog));
                    setResults(findCompanyBlog);  // has the company and blog list only
                    setFoundCompanyBlog(1);
                    setFoundBlog(0);
                } catch (error) {
                    console.error('Error fetching company blogs:', error.message);
                }
            };
            getCompanyBlogs();
        }
    }, [params, foundCompanyBlog, switchCompany]);

    // user provided a post id or we were able to find one
    useEffect(() => {
        if ((params.length === 3) && (foundBlog === 0)) {
            setBlogContent('Retrieving blog...');


            const getCompanyBlogs = async () => {
                try {
                    const findBlogData = await blogHandler(`http://localhost:4500/blog/post/${params[0]}/${params[1]}/${params[2]}`);
                    // setResults(findBlogData); // has the full blog post details
                    setFoundBlog(1);
                    if (findBlogData[0]?.blog) { setBlogContent(findBlogData[0]?.blog) };
                    if (findBlogData[0]?.likes) { setBlogLikes(findBlogData[0]?.likes) };
                    //console.log('Find blog data!' + JSON.stringify(findBlogData));

                    const blogData = await blogHandler(`http://localhost:4500/blog/v2/${params[0]}/${params[1]}`);

                    //if (blogData) {
                       // alert('Blog Data Slugs: [ ' + JSON.stringify(blogData.find((entry) => entry.slugs)) + ']');
                        setCompanyDetails(blogData.find((entry) => entry.company));
                        setSlugList(blogData.find((entry) => entry.slugs));
                        setBlogList(blogData.find((entry) => entry.blogs));
                    //};

                } catch (error) {
                    console.error('Error fetching company blogs:', error.message);
                }
            };
            getCompanyBlogs();
        }
    }, [params, foundCompanyBlog, foundBlog, blogContent]);

    if (params.length === 3) {
        // alert('Length is 3');
        //setParametersDefined(false);
        return (
            <>
                <BlogHeader
                    companyDetails={companyDetails}
                    slugListArray={slugList}
                    blogListArray={blogList}
                    blogContent={blogContent}
                    urlParse={urlParse}
                    currentId={params[2]}
                    likeCount={blogLikes}
                    switchCompany={switchCompany}
                    setParametersDefined={setParametersDefined}
                    setSwitchCompany={setSwitchCompany}
                    setUrlParse={setUrlParse}
                    setIndexFind={setIndexFind}
                    indexFind={indexFind}
                />
            </>
        );
    }
    else if (params.length === 2 && foundCompanyBlog === 0) {

        // alert('params length 2  foundCompanyBlog 0' + '[data?] ' + JSON.stringify(blogList) + ' ]');
        // setParametersDefined(false);
        return (
            <>
                <h1>Viewing blogs for type [{params[0]}] slug [{params[1]}]</h1>
                <p>Parameters length is 3</p>
                <p>Loading...</p>
            </>
        );
    }
    else if (params.length === 2 && foundCompanyBlog === 1) {

        // alert('params length 2  foundCompanyBlog 0');
        let data;
        if (results) { data = results; }

        if ((data && data.results) && (typeof data.results[0].id == 'number')) {
            //alert('redirect here! [' + JSON.stringify(slugList) + ' ]');
            router.push(`/blogs/${params[0]}/${params[1]}/${data.results[0].id}`);
        }

        return (
            <>
                <h1>Viewing blogs for type [{params[0]}] slug [{params[1]}]</h1>
                <p>{JSON.stringify(results)}</p>
                <p>Parameters length is 2 found the latest company blog</p>
                <h2>Found Company Blog? {foundCompanyBlog}</h2>
                {data.results ? <h3 style={{color: 'red'}}>{data.results[0].id}</h3> : null}
            </>
        );
    }
    else if (params.length === 1) {
        return (
        <>
        <h1>Viewing blogs for type {params[0]}</h1>
            <p>Design for entire category</p>
        </>
        )
    }

    return (
        <>
            <h1>Blogs Home Page</h1>
            <p>{JSON.stringify(results)}</p>
        </>
    );
}

export default Blogs;