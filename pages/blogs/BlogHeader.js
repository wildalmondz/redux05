import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { blogHandler } from '../../pages/api';
import { styled } from '@mui/material/styles';
//import styles from '../../styles/Blog.module.scss'
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InviteBlog from './InviteBlog';
import {useRouter} from "next/router";
import blog from "../blog";

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

const BlogHeader = ({ companyDetails, slugListArray, blogListArray, blogContent }) => {
    // console.log('companyDetails ' + companyDetails);

    const companyInfo = companyDetails.company[0];

    const [likes, setLikes] = useState(0); // State for managing likes
    let [idNext, setIdNext] = useState(false); // State for managing routing
    let [structuredUrl, setStructuredUrl] = useState({}); // State for managing routing
    const [blogNext, setBlogNext] = useState(false); // State for managing routing
    const [blogIndex, setBlogIndex] = useState(0); // State for managing blogs
    const [companyIndex, setCompanyIndex] = useState(0); // State for managing index
    const [disabledCoNext, setDisableCoNext] = useState(false);
    const [disabledCoPrev, setDisableCoPrev] = useState(true);
    const [disabledBlogNext, setDisableBlogNext] = useState(false);
    const [disabledBlogPrev, setDisableBlogPrev] = useState(true);
    const [blogTitle, setBlogTitle] = useState('Loading...');


    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {

            if (idNext === true) {
                router.push(`/blogs/${structuredUrl.type}/${structuredUrl.slug}`);
                setIdNext(idNext = false);
            }


            if (blogListArray.blogs.length <= 1){
                console.log('Next disable: ' + (blogListArray.blogs.length - 1));
                setDisableBlogNext(true);
            }

            if (blogNext === true) {
                try {

                    router.push(`/blogs/${structuredUrl.type}/${structuredUrl.slug}/${structuredUrl.post}`);
                    // Make an asynchronous request
                    // const results = await blogHandler(`http://localhost:4500/blog/post/${structuredUrl.type}/${structuredUrl.slug}/${structuredUrl.post}`);

                    // Handle the results
                    // idFound = true;
                    // blogContent = results[0]?.blog || null;

                    // Do something with blogContent
                    // console.log('blogContent' + blogContent);

                    /*
                    console.log('blogListArray ' + (blogListArray.blogs.length - 1));
                    if (blogListArray.blogs.length > 0) {
                        setDisableBlogNext(false);
                    }

                     */

                    setBlogNext(false);
                } catch (error) {
                    // Handle errors if any
                    console.error('Error fetching blog:', error);
                }
            }
        };

        // Call the async function immediately
        fetchData();
    }, [idNext, blogNext]);

    const handleLike = () => {
        setLikes(likes + 1);
    };

    const togglePrevCompany = (event) => {
        event.preventDefault();

        setDisableCoNext(false);
        console.log('Here previous '+ companyIndex)

        if (companyIndex != 0) {
            setCompanyIndex(companyIndex - 1);

            setStructuredUrl({
                type: slugListArray.slugs[companyIndex - 1].type || '',
                slug: slugListArray.slugs[companyIndex - 1].slug || '',
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


        console.log('Here next '+ companyIndex + ' of ' + (slugListArray.slugs.length - 1));

        setDisableCoPrev(false);
        setBlogIndex(0);

        if (companyIndex !== slugListArray.slugs.length - 1) {
            console.log('Next clicked! ' + (companyIndex + 1));
            setCompanyIndex(companyIndex + 1);
            setDisableCoNext(false);

            setStructuredUrl({
                type: slugListArray.slugs[companyIndex + 1].type || '',
                slug: slugListArray.slugs[companyIndex + 1].slug || '',
                post: undefined,
            });
            setIdNext(idNext = true);

        }

        else if (companyIndex === slugListArray.slugs.length - 1) { // keep progressing unless it is the last element
            // set to disabled
            setDisableCoNext(true);
            setIdNext(idNext = true);
        }
    }

    const togglePrevBlog = (event) => {
        event.preventDefault();
        setDisableBlogNext(false);

        let moveValue = 1;

        if (blogIndex > 0) {
            setBlogIndex(blogIndex - 1);
        }
        if (blogIndex <= 0){
            setDisableBlogPrev(true);
        }

        if (blogIndex === blogListArray.blogs.length){
            moveValue = 2;
        }

        if ((blogListArray.blogs[blogIndex - 1]) && (blogListArray.blogs[blogIndex - 1].id)) {
            setStructuredUrl({
                type: slugListArray.slugs[companyIndex].type || '',
                slug: slugListArray.slugs[companyIndex].slug || '',
                post: blogListArray.blogs[blogIndex - moveValue].id,
            });

            setBlogTitle(blogListArray.blogs[blogIndex - moveValue].id);
        }

        setBlogNext(true);
    }

    const toggleNextBlog = (event) => {
        event.preventDefault();
        setBlogIndex(blogIndex + 1);
        setDisableBlogPrev(false);

        setBlogTitle(blogListArray.blogs[blogIndex].title);

        if ((blogIndex < (blogListArray.blogs.length - 2)) && ((blogIndex + 1) != (blogListArray.blogs.length - 1))){  // more to go not the end of the blogs
            console.log('blogIndex: ' + (blogIndex + 1) + ' type: [' + typeof(blogIndex) + '] length: ' + (blogListArray.blogs.length - 1) + 'type: [' + typeof(blogListArray.blogs.length) + ']');
            setDisableBlogNext(false);
        }
        else {
            console.log('Setting end here!');
            setDisableBlogNext(true);
        }

        if ((blogListArray.blogs[blogIndex + 1]) && (blogListArray.blogs[blogIndex + 1].id)) {
            setStructuredUrl({
                type: slugListArray.slugs[companyIndex].type || '',
                slug: slugListArray.slugs[companyIndex].slug || '',
                post: blogListArray.blogs[blogIndex + 1].id,
            });
        }

        setBlogNext(true);

    }

    return (
        <Layout>

            {/* Blog display section */}
            <section style={{ padding: '.5em' }}>
                <div>
                    <Box sx={{
                        flexGrow: 1,
                        height: '10em'
                    }}>
                        <Grid container spacing={0}>
                            <Grid xs>
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
                            <Grid xs>
                                <Item><InviteBlog /></Item>
                            </Grid>
                        </Grid>
                        <Grid xs>
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
                        <Grid xs>
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
                                <div id='blog-top'>
                                    <div id='blog-header'>
                                        <div id='blog-title'><strong>{blogListArray.blogs[blogIndex].title}</strong></div>
                                        <div id='blog-author'><strong>By: </strong><strong>{blogListArray.blogs[blogIndex].firstname}
                                            { ' ' }   {blogListArray.blogs[blogIndex].lastname}</strong></div>
                                        <div id='blog-date'>{blogListArray.blogs[blogIndex].createdAt}</div>
                                    </div>
                                </div>

                                <LikeButton onClick={handleLike} aria-label="like">
                                    <FavoriteIcon />
                                    {likes}
                                </LikeButton>
                            </Item>
                        </Grid>
                    </Box>
                </div>
                <div style={{ borderTop: '1.5px solid #000', margin: '3em 0' }} />

                <div style={{ borderTop: '1.5px solid #000', margin: '3.75em 0' }} />
                <div>
                    {/*  */}

                    <Box sx={{ flexGrow: 1 }}>
                        <Grid xs={6}>
                            <BlogItem sx={{
                                overflow: 'auto',  // Add overflow property for scrolling if content exceeds the box
                                whiteSpace: 'pre-wrap',  // Allow wrapping of long lines
                                wordBreak: 'break-word',  // Break words to prevent overflow
                                textAlign: 'justify',  // Justify text for a cleaner look
                                lineHeight: '1.5',  // Set line height for better readability
                            }}>
                                <div style={{minHeight: '30em'}} dangerouslySetInnerHTML={{ __html: blogContent }} />
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

        </Layout>
    );
};

export default BlogHeader;