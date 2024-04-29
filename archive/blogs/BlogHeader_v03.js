import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InviteBlog from './InviteBlog';
import {useRouter} from "next/router";
import fixDate from "../../src/lib/fixDate";
import axios from "axios";

const OverlayText = styled('h3')({
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'black', // Text color
    zIndex: 1, // Ensure text appears above the image
});

const StyledItem = styled('div')({
    height: '100%', // Adjust as needed
    border: '1px solid #000', // Example border for visualization
    position: 'relative',
});

const BackgroundImage = styled('div')({
    backgroundImage: `url('https://images.pexels.com/photos/1277181/pexels-photo-1277181.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
});

const CompanyArrows = styled('div')({
    width : '100%',
    margin: '0 auto',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'space-between',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
});

const BlogArrows = styled('div')({
    width : '100%',
    margin: '0 auto',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'space-between',
    top: '100%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
});

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    height: '12em',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: '1px solid #000', // Example border for visualization
}));

const BlogItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: '1px solid #000', // Example border for visualization
}));

const LikeButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    fontSize: 'small',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.primary.main,
}));

const ShiftButton = styled('button')({
    height: '50px',
    width: '60px',
    background: 'transparent',
    border: 'none !important',
});

const NoShiftButton = styled('button')({
    height: '50px',
    width: '60px',
    border: '1px solid #999999',
    backgroundColor: '#cccccc',
    color: '#666666',
    disabled: 'true',
    opacity: '0.2',
});

const ArrowImg = styled('img')({
    height: '40px',
    width: '40px',
});

const findIndexById = (dataArray, currentId) => {
    const idNumber = Number(currentId);

    const y = dataArray.findIndex(item => item.id === idNumber);
    console.log('index: [' + index + ']');
    return index !== -1 ? index : null;
};

function PrevCo(props) {
    if (props.active === true) {
        return (
            <NoShiftButton>
                <ArrowImg src={'https://wildalmonds.com/api/uploads/37453669-cb2a-48c2-9f73-253002cb55f2_3017916_antecedent_arrow_earlier_fill_left_icon 2.png'}/>
            </NoShiftButton>
        )
    } else if (props.active === false){
        return (
            <ShiftButton onClick={props.toggle} disabled={props.active}>
                <ArrowImg
                    src={'https://wildalmonds.com/api/uploads/37453669-cb2a-48c2-9f73-253002cb55f2_3017916_antecedent_arrow_earlier_fill_left_icon 2.png'}/>
            </ShiftButton>
        );
    }
}

function NextCo(props) {
    if (props.active === true) {
        return (
            <NoShiftButton>
                <ArrowImg src={'https://wildalmonds.com/api/uploads/8b8c73df-c593-4a8f-ad60-305bce132bc2_antecedent_arrow_next.png'}/>
            </NoShiftButton>
        )
    } else if (props.active === false) {
        return (
            <ShiftButton onClick={props.toggle} disabled={props.active}>
                <ArrowImg
                    src={'https://wildalmonds.com/api/uploads/8b8c73df-c593-4a8f-ad60-305bce132bc2_antecedent_arrow_next.png'}/>
            </ShiftButton>
        );
    }
}

const BlogHeader = ({ companyDetails, slugListArray, blogListArray, blogContent, urlparse, currentId, likeCount }) => {

    let index;

    const [likes, setLikes] = useState(0); // State for managing likes
    let [idNext, setIdNext] = useState(false); // State for managing routing
    let [structuredUrl, setStructuredUrl] = useState({}); // State for managing routing
    const [blogNext, setBlogNext] = useState(false); // State for managing routing
    const [blogPrev, setBlogPrev] = useState(0); // State for managing routing
    const [blogIndex, setBlogIndex] = useState(0); // State for managing blogs
    const [companyIndex, setCompanyIndex] = useState(0); // State for managing index
    const [disabledCoNext, setDisableCoNext] = useState(false);
    const [disabledCoPrev, setDisableCoPrev] = useState(true);
    const [disabledBlogNext, setDisableBlogNext] = useState(false);
    const [disabledBlogPrev, setDisableBlogPrev] = useState(true);
    const [foundDirection, setFoundDirection] = useState(false);
    const [blogTitle, setBlogTitle] = useState('Loading...');
    const [prettyDate, setPrettyDate] = useState('Loading...');
    const [hasLiked, setHasLiked] = useState(false);
    const [companyInfo, setCompanyInfo] = useState('');
    const [slugsList, setSlugsList] = useState('');
    const [blogsList, setBlogsList] = useState('');
    const [dataArray, setDataArray] = useState('');
    const [content, setContent] = useState('');


    const [foundCompany, setFoundCompany] = useState(0);
    const [foundSlugs, setFoundSlugs] = useState(0);
    const [foundBlogs, setFoundBlogs] = useState(0);

    if (companyDetails && companyDetails.company[0] && foundCompany === 0) {
        setCompanyInfo(companyDetails.company[0]);
        setFoundCompany(1);
    }

    if (slugListArray && foundSlugs === 0){
        setSlugsList(slugListArray);
        setFoundSlugs(1);
    }

    if (blogListArray && foundBlogs === 0) {
        setBlogsList(blogListArray);
        setDataArray(blogListArray.blogs);
        setFoundBlogs(1);
    }

    if (blogContent && content === '') {
        setContent(blogContent);
    }

    let startId = currentId;

    startId = Number(startId);

    if (dataArray) {
        index = findIndexById(dataArray, startId);


        if ((index !== null) && (foundDirection === false)) {
            console.log(` The next element with id ${startId} is found at index ${index}`);
            // set the startId to the next Id the user is routing to.
            if ((dataArray[index].id) && (dataArray[index + 1])) {
                console.log('Next id is...' + dataArray[index + 1].id)
            }
            if ((dataArray[index].id) && (dataArray[index - 1])) {
                console.log('Previous id is...' + dataArray[index - 1].id)
                console.log('Previous index is...' + (index - 1))
                setBlogPrev(dataArray[index - 1].id);
            }
            setFoundDirection(true);
            if (index > 0) {
                setDisableBlogPrev(false);
            }
        } else if (foundDirection === true) {
            next;
        } else {
            console.log(`Next element with id ${startId} is not found in the array`);
        }

    }

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {

            console.log(`Like Count: ${likeCount} type is ${typeof likeCount}`)
            if (typeof likeCount === "object") {
                console.log(JSON.stringify(likeCount))
                setLikes(null);
            }
            if (likeCount != null) {
                setLikes(likeCount);
            }

            const hasLikedStorage = localStorage.getItem('hasLiked');
            if (hasLikedStorage) {
                setHasLiked(false);
            }

            if (idNext === true) {
                alert('Here!!');
                // reset the state?
                setCompanyInfo('');
                setFoundCompany(0);
                setSlugsList('');
                setFoundSlugs(0);
                setContent('');
                setBlogsList('');
                setDataArray('');
                setFoundBlogs(0);



                router.push(`/blogs/${structuredUrl.type}/${structuredUrl.slug}`);
                setIdNext(idNext = false);
            }

            if (blogsList && blogsList.blogs && blogsList.blogs.length <= 1){
                console.log('Next disable: ' + (blogsList.blogs.length - 1));
                setDisableBlogNext(true);
            }

            if (blogNext === true) {
                // reset the array with blogs in it


                try {
                    router.push(`/blogs/${structuredUrl.type}/${structuredUrl.slug}/${structuredUrl.post}`);
                    setBlogNext(false);
                } catch (error) {
                    // Handle errors if any
                    console.error('Error fetching blog:', error);
                }
            }
            // if (blogsList && blogsList.blogs && blogsList.blogs.length <= 1) {
            if (blogsList && blogsList.blogs && blogsList.blogs[index]) {
                setPrettyDate(fixDate(blogsList.blogs[index].createdAt, true));
            }
        };

        // Call the async function immediately
        fetchData();
    }, [idNext, blogNext, likeCount]);

    const handleLike = async () => {
        let parsedLike;
        const localStorageHasLiked = localStorage.getItem(`hasLiked_${currentId}`);

        if (localStorageHasLiked === null) { // the condition where no likes yet exists
            parsedLike = {"hasLiked": false};
        } else {
            parsedLike = JSON.parse(localStorageHasLiked);
        }

        if (!hasLiked && parsedLike.hasLiked !== true) {
            setLikes(likes + 1);
            setHasLiked(true);

            // Store the information that the user has liked for the specific testId in localStorage
            localStorage.setItem(`hasLiked_${currentId}`, JSON.stringify({ hasLiked: true }));

            try {
                await axios.post(`http://localhost:4500/blog/setlike/${currentId}`);
            } catch (error) {
                console.error('Error updating likes:', error.message);
            }
        }
        else if (hasLiked || parsedLike.hasLiked === true) {
            alert('You have already liked this item! Thank you!');
        }
    };

    const togglePrevCompany = (event) => {
        event.preventDefault();

        setDisableCoNext(false);
        setLikes(0);

        console.log('Here previous '+ companyIndex)

        if (companyIndex != 0) {
            setCompanyIndex(companyIndex - 1);

            setStructuredUrl({
                type: slugsList.slugs[companyIndex - 1].type || '',
                slug: slugsList.slugs[companyIndex - 1].slug || '',
                post: undefined,
            });
            setDisableCoPrev(false);
            setIdNext(idNext = true);
        }
        else if (companyIndex === 0) {
            setDisableCoPrev(true);
        }
    }

    const toggleNextCompany = (event) => {
        event.preventDefault();
        setDisableBlogPrev(true);
        setDisableBlogNext(false);
        setLikes(null);

        // console.log('Here next '+ companyIndex + ' of ' + (slugListArray.slugs.length - 1));

        setDisableCoPrev(false);
        setBlogIndex(0);

        // if ((slugsList && slugsList.slugs) && (companyIndex !== slugsList.slugs.length - 1)) {
        if (companyIndex !== slugsList.slugs.length - 1) {
            console.log('Next clicked! ' + (companyIndex + 1));
            setCompanyIndex(companyIndex + 1);
            setDisableCoNext(false);

            setStructuredUrl({
                type: slugsList.slugs[companyIndex + 1].type || '',
                slug: slugsList.slugs[companyIndex + 1].slug || '',
                post: undefined,
            });
            setIdNext(idNext = true);

        }

        else if ((slugsList && slugsList.slugs) && (companyIndex === slugsList.slugs.length - 1)) { // keep progressing unless it is the last element
            // set to disabled
            setDisableCoNext(true);
            setIdNext(idNext = true);
        }
    }

    const togglePrevBlog = (event) => {

        // we use the urlparse items here as the type and company do not change when scrolling blogs

        event.preventDefault();
        setDisableBlogNext(false);
        setDataArray('');
        setContent('');


        // const dataArray = blogsList.blogs;
        const targetId = blogsList.blogs[index].id;

        let prevIndex = findIndexById(dataArray, targetId);


        if ((index !== null) && ((prevIndex -1) > 0)){
            console.log(` Index Exists: The previous element  ${blogsList.blogs[prevIndex -1].id} of id ${targetId} 
            is found at index ${prevIndex - 1}. blog index is ${blogIndex}`);

            if (index > 0) {
                console.log(`${index} is greater than zero so set the blogIndex from ${blogIndex} to ${index}`);
                setBlogIndex(index);
            }
            else if (blogIndex > 0) {
                console.log(`
                index not null blogIndex ${blogIndex} is greater than zero so set the blogIndex from ${blogIndex} to ${index}`);
                setBlogIndex(blogIndex - 1);
            }
        } else if ((prevIndex - 2) < 0) {
            console.log(`Previous index element with element id ${(prevIndex -1)} is not found in the array`);
            setDisableBlogPrev(true);
        }

        let moveValue = 1;

        if ((blogIndex <= 0) && (index <= 0)) {
            console.log('blog index is ' + blogIndex + ' moveValue ' + moveValue + ' index ' + index + ' blog prev ID ' + blogPrev);
            setDisableBlogPrev(true);
        }

        if (blogIndex === blogsList.blogs.length){
            console.log(blogIndex + ' blog index is equal to length ' + blogIndex.blogs.length + ' moveValue ' + moveValue);
            moveValue = 2;
        }

        if ((blogsList.blogs[index - 1]) && (blogsList.blogs[index - 1].id)) {
            console.log('Index at blogIndex: ' + index + ' move value ' + moveValue);
            setStructuredUrl({
                type: urlparse.type || '',
                slug: urlparse.slug || '',
                post: blogsList.blogs[index - moveValue].id,
            });
            console.log(JSON.stringify(structuredUrl));
            setBlogTitle(blogsList.blogs[index - moveValue].id);
            setBlogNext(true);

        } else if (index) {
            console.log('Index exists: ' + index);
            setBlogIndex(index);
            console.log('Blog_old Index: ' + blogIndex);

            setStructuredUrl({
                type: urlparse.type || '',
                slug: urlparse.slug || '',
                post: blogsList.blogs[index - 1].id,
            });
        }

        setBlogNext(true);
    }

    // console.log(`here is the end of nextIndex:  ${nextIndex}  blogsListArray: ${blogListArray.blogs.length}`);

    const toggleNextBlog = (event) => {
        event.preventDefault();
        setDisableBlogNext(false);

        setDataArray('');
        setContent('');

        /*
        if (blogsList && blogsList.blogs) {
            alert(blogsList.blogs[index].id);
        }

         */

        if (likeCount !== null) {
            setLikes(likeCount);
        }

        alert('Index' + index);
        // const dataArray = blogsList.blogs;
        const targetId = blogsList.blogs[index].id;

        let nextIndex = findIndexById(dataArray, targetId);

        console.log(`here is the end of nextIndex:  ${nextIndex}  blogsListArray: ${blogsList.blogs.length}`);

        if ((nextIndex + 2) == blogsList.blogs.length) { // probably needs to be the length
            console.log(`disable! This is the end of next elements ${nextIndex + 2}  is equal to ${blogsList.blogs.length}`);
            setDisableBlogNext(true);
        }

        if ((index !== null) && ((nextIndex + 2) < blogsList.blogs.length)){
            console.log(` Index Exists: The previous element  ${blogsList.blogs[nextIndex + 1].id} of id ${targetId} 
            is found at index ${nextIndex + 1}. blog index is ${index}`);


            if ((nextIndex + 1) < blogsList.blogs.length) { // probably needs to be the length
                console.log(`${index} is less than the length so set the blogIndex from ${blogIndex} to ${index}`);
                setBlogIndex(index);
            }
            else if (blogIndex > 0) {
                console.log(`
                index not null blogIndex ${blogIndex} is greater than zero so set the blogIndex from ${blogIndex} to ${index}`);
                setBlogIndex(blogIndex + 1);
            }
        }

        let moveValue = 1;

        if ((blogIndex <= 0) && (index <= 0)) {
            console.log('blog index is ' + blogIndex + ' moveValue ' + moveValue + ' index ' + index + ' blog prev ID ' + blogPrev);
            setDisableBlogPrev(true);
        }

        if (blogIndex === blogsList.blogs.length){
            console.log(blogIndex + ' blog index is equal to length ' + blogIndex.blogs.length + ' moveValue ' + moveValue);
            moveValue = 2; // move back to the previous blog should user navigate to previous
        }

        if ((blogsList.blogs[index + 1]) && (blogsList.blogs[index + 1].id)) {
            console.log('CompanyIndex at blogIndex: ' + companyIndex + ' index ' + index + ' move value ' + moveValue);

            setStructuredUrl({
                type: companyInfo.type || '',
                slug: urlparse.slug  || '',
                post: blogsList.blogs[index + moveValue].id,
            });
            setBlogTitle(blogsList.blogs[index + moveValue].id);
            setDisableBlogPrev(false);
            setBlogNext(true);
        } else if ((index) && (blogsList.blogs[index + moveValue])) {
            // unreachable code?
            console.log('Index exists: ' + index);
            setBlogIndex(index);
            console.log('Blog_old Index: ' + blogIndex);

            setStructuredUrl({
                type: slugsList.slugs[companyIndex].type || '',
                slug: slugsList.slugs[companyIndex].slug || '',
                post: blogsArray.blogs[index + moveValue].id,
            });
            setBlogNext(true);
        }
        else { // unable to find the next post
            setBlogNext(false);
            setDisableBlogNext(true);
        }

    }

    return (
        <Layout>
            {blogsList.blogs ? (
                <span>{JSON.stringify(blogsList.blogs.length)}</span>
            ) : (
                <div>Loading...</div>
            )}

            {/* Blog_old display section */}
            <section style={{ padding: '.5em' }}>
                <div>
                    <Box sx={{
                        flexGrow: 1,
                        height: '10em'
                    }}>
                        <Grid container spacing={0}>
                            <Grid item xs={6}>
                                <StyledItem>
                                    <BackgroundImage />
                                    <OverlayText>{companyInfo.name}</OverlayText>
                                    <CompanyArrows>
                                        <span id='nextCursor'>
                                            <PrevCo toggle={(event) => togglePrevCompany(event)}
                                                    active={disabledCoPrev} title={''} />
                                        </span>
                                        <span id='nextCursor'>
                                            <NextCo toggle={(event) => toggleNextCompany(event)}
                                                    active={disabledCoNext} title={''} />
                                        </span>
                                    </CompanyArrows>
                                </StyledItem>
                            </Grid>
                            <Grid item xs={6}>
                                <Item><InviteBlog urlParse={urlparse}/></Item>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Item sx={{
                                color: 'white',
                                backgroundImage: 'url(https://wildalmonds.com/api/uploads/725c78bb-ae08-4ed7-93cb-3fb6becd7d04_subtle-dots.png)',
                                paddingTop: '0.5em',
                                paddingBottom: '0.5em',
                                backgroundColor: '#17355B',
                                height: '100%',
                                width: '100%',
                                position: 'relative',
                                display: 'flex',
                                justifyContent: 'space-around',
                            }}>Enter your email to receive an invitation to review this companies products</Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Item sx={{
                                backgroundImage: 'url(https://wildalmonds.com/api/uploads/725c78bb-ae08-4ed7-93cb-3fb6becd7d04_subtle-dots.png)',
                                paddingTop: '0.5em',
                                paddingBottom: '0.5em',
                                backgroundColor: 'white',
                                height: '100%',
                                width: '100%',
                                position: 'relative',
                                display: 'flex',
                                justifyContent: 'space-around',
                            }}>
                                {blogsList.blogs && blogsList.blogs[index] ? (
                                    <div id='blog-top'>
                                        <div id='blog-header'>
                                            <div id='blog-title' style={{fontSize: '1.25em'}}>
                                                <strong>{blogsList.blogs[index].title}</strong>
                                            </div>
                                            <div id='blog-author'>
                                                <strong>By: </strong>
                                                <strong>{blogsList.blogs[index].firstname} {blogsList.blogs[index].lastname}</strong>
                                            </div>
                                            <div id='blog-date'>{prettyDate}</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>Loading...</div>
                                )}


                                <LikeButton onClick={handleLike} aria-label="like">
                                    <FavoriteIcon />
                                    {likes}
                                </LikeButton>
                            </Item>
                        </Grid>
                    </Box>
                </div>
                <div style={{ paddingTop: '3px', margin: '4em 0' }} />
                <div style={{ paddingTop: '3px', margin: '4em 0' }}>
                    {/*  */}

                    <Box sx={{ flexGrow: 1 }}>
                        <Grid item xs={6}>
                            <BlogItem sx={{
                                paddingTop: '0.5em',
                                paddingBottom: '0.5em',
                                overflow: 'auto',  // Add overflow property for scrolling if content exceeds the box
                                whiteSpace: 'pre-wrap',  // Allow wrapping of long lines
                                wordBreak: 'break-word',  // Break words to prevent overflow
                                textAlign: 'justify',  // Justify text for a cleaner look
                                lineHeight: '1.25',  // Set line height for better readability
                            }}>
                                {content ? (
                                    <div style={{minHeight: '30em'}} dangerouslySetInnerHTML={{ __html: content }} />
                                ) : (
                                    <div>Loading content...</div>
                                )}


                                <BlogArrows>
                                        <span id='nextCursor'>
                                            <PrevCo toggle={(event) => togglePrevBlog(event)}
                                                    active={disabledBlogPrev} title={''} />
                                        </span>
                                    <span id='nextCursor'>
                                            <NextCo toggle={(event) => toggleNextBlog(event)}
                                                    active={disabledBlogNext} title={''} />
                                        </span>
                                </BlogArrows>
                            </BlogItem>

                        </Grid>
                    </Box>
                </div>
                <div style={{ borderTop: '1px solid #000', margin: '3em 0' }} />
            </section>
        </Layout>
    );
};

export default BlogHeader;

// add code above to show articles by likes?
/*
            <ul style={{ listStyle: 'none', padding: '0' }}>
                {blogListArray.blogs.map((blogValue) => (
                    <li key={blogValue.id} style={{ margin: '10px 0', fontSize: 'smaller' }}>
                        <Link
                            href={`/blogs/[type]/[slug]/[id]`}
                            as={`/blogs/${companyInfo.type}/${companyInfo.slug}/${blogValue.id}`}
                            passHref
                            style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                        >{blogValue.title}
                        </Link>
                    </li>
                ))}
            </ul>
 */