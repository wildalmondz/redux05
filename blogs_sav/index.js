import { useState } from 'react';
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
import findBlogs from './findBlogs.js';
import slugToGameId from './slugToGameId.js';

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

const DirectionArrows = styled('div')({
    width : '100%',
    margin: '0 auto',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'space-between',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
});


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    height: '15em',
    padding: theme.spacing(3),
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

const ArrowImg = styled('img')({
    height: '40px',
    width: '40px',
});


function PrevCo(props) {
    return (
        <ShiftButton onClick={props.toggle} disabled={props.active}>
            <ArrowImg src={'https://wildalmonds.com/api/uploads/37453669-cb2a-48c2-9f73-253002cb55f2_3017916_antecedent_arrow_earlier_fill_left_icon 2.png'}/>
        </ShiftButton>
    );
}

function NextCo(props) {
    return (
        <ShiftButton onClick={props.toggle} disabled={props.active}>
            <ArrowImg src={'https://wildalmonds.com/api/uploads/8b8c73df-c593-4a8f-ad60-305bce132bc2_antecedent_arrow_next.png'}/>
        </ShiftButton>
    );
}

const Slugs = ({ companyDetails, slugListArray, blogListArray }) => {
    console.log(slugListArray);

    const initialValue = 0;
    const companyInfo = companyDetails.company[0];

    const [likes, setLikes] = useState(0); // State for managing likes
    const [blogIndex, setBlogIndex] = useState(0); // State for managing likes
    const [companyIndex, setCompanyIndex] = useState(0); // State for managing likes
    const [disabledCompanyNext, disabledCompanyPrev] = useState(false);


    const handleLike = () => {
        setLikes(likes + 1);
    };

    const toggleNextCompany = (event) => {
        event.preventDefault();
        // this.setState({ blogIndex: 0 });  // why set to 0 each time?

        if (companyIndex !== 0) {  		// first time setting previous to false
            setCompanyIndex(companyIndex + 1);
        }

        if (companyIndex !== slugListArray.length) {
            setCompanyIndex(companyIndex + 1);
        }

        let type= slugListArray.slugs[companyIndex].type;
        let slug= slugListArray.slugs[companyIndex].slug;
        let disabledCompanyNext = companyIndex === (slugListArray.slugs.length - 1);

        this._asyncRequest = findBlogs(
            this.state.onFetch,
            type,
            slug
        ).then((response) => {
            let tempVar = response;
            this._asyncRequest = slugToGameId(
                this.props.onFetchSlug,
                this.state.slug
            );
        }).catch((error) => {
                console.log(error);
            });

        if((companyIndex) === (slugListArray.slugs.length - 1)) {
            this.props.history.push(`/blog/${this.props.blogs[4].slugs[(companyIndex - 1)].type}/${this.props.blogs[4].slugs[(companyIndex - 1)].slug}`);
        }
        else {
            this.props.history.push(`/blog/${this.props.blogs[4].slugs[companyIndex].type}/${this.props.blogs[4].slugs[(companyIndex)].slug}`);
        }
        // reset the blog status?
        this.setState({
            blogIndex: 0,
            disabledBlogPrev: true,
            disabledBlogNext: true,
            companyIndex: companyIndex,
            disabledCompanyNext: disabledCompanyNext,
            disabledCompanyPrev: false,
            slug: slug,
            type: type,
        });
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
                                    <DirectionArrows>
															<span id='prevCursor'>
																<PrevCo toggle={(event) => this.togglePrevCompany(event)}
                                                                        active={disabledCompanyPrev} title={''} />
															</span>
                                        <span id='nextCursor'>
																<NextCo toggle={(event) => toggleNextCompany(event)}
                                                                        active={disabledCompanyNext} title={''} />
															</span>
                                    </DirectionArrows>
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
                            }}>Enter your email to recieve an invitation to review this companies products</Item>
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
                            }}>xs
                                <LikeButton onClick={handleLike} aria-label="like">
                                    <FavoriteIcon />
                                    {likes}
                                </LikeButton>
                            </Item>
                        </Grid>
                    </Box>
                </div>
                <div style={{ borderTop: '1px solid #000', margin: '3em 0' }} />



                <div style={{ borderTop: '1px solid #000', margin: '3em 0' }} />
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
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus porta eros sollicitudin auctor. Sed rhoncus, enim condimentum mattis placerat, lorem ante dignissim sem, et vulputate ipsum massa et nunc. Donec sed odio commodo, consequat sapien venenatis, mollis neque. Pellentesque imperdiet, ipsum at malesuada iaculis, ligula lacus gravida mauris, a fermentum ipsum odio at felis. Sed ante neque, feugiat ut aliquam ac, vulputate vitae mi. Maecenas euismod turpis nisi, sed viverra velit dapibus eu. Aliquam porttitor urna elementum elit facilisis rhoncus. Nunc imperdiet rutrum nisi, tincidunt efficitur lorem laoreet vitae. Cras sed varius quam. Nullam pellentesque dolor vitae erat dapibus ornare. Integer eleifend tellus eu felis tristique lobortis. Donec et eros consectetur odio pretium cursus. Curabitur vestibulum molestie urna, vehicula bibendum ante volutpat eu. Duis luctus neque nec molestie elementum. Aliquam ex nisi, consequat non leo a, suscipit tempus dui.
                                <br />
                                <br />
                                Duis vel orci ligula. Nullam accumsan ipsum vel egestas tincidunt. Sed tristique gravida arcu, sed faucibus tellus finibus non. Nunc dignissim facilisis eros et euismod. Phasellus eu quam nec lorem vestibulum vestibulum. Ut ut varius metus, quis convallis nisi. Phasellus finibus sollicitudin neque, sit amet aliquet quam tristique nec. Ut molestie, neque vitae mollis fringilla, augue elit volutpat enim, eget luctus ipsum enim bibendum felis. Sed condimentum lacus vel urna vulputate, non rhoncus risus aliquam. Mauris varius placerat lectus, et lobortis nulla sagittis quis. Pellentesque semper augue ut erat aliquet, ac semper enim semper. Sed tincidunt fringilla dolor eget condimentum. Suspendisse condimentum elit vel rutrum egestas. Praesent egestas pharetra ex, ornare rhoncus nisl lobortis vitae.
                                <br />
                                <br />

                                Praesent feugiat, dolor non tristique rhoncus, mi dolor vehicula enim, quis pharetra augue erat eget purus. Sed interdum nisi id tortor rutrum, ac egestas nisl finibus. Ut sed fermentum nibh, blandit placerat augue. Integer accumsan rutrum pellentesque. Etiam ultricies orci sit amet ex facilisis consectetur. Aliquam varius nisi ac pulvinar vehicula. Sed pulvinar quam non luctus porta.
                                <br />
                                <br />

                                Nam dapibus augue cursus ante tempus rutrum. Nam euismod cursus dui, sed malesuada dolor tempor sed. Nam egestas tortor vitae bibendum lobortis. Aenean imperdiet risus ut commodo porta. Phasellus a tortor magna. Vestibulum ac finibus nunc. Cras venenatis est eget orci dignissim mattis. Aliquam dapibus id neque at porta. Quisque pellentesque hendrerit eros non tempor. Donec eget pellentesque urna. Praesent mollis rhoncus risus, sit amet pharetra ligula ultrices sit amet. Aliquam ullamcorper augue ac elementum commodo. Vestibulum ac euismod quam, sit amet egestas neque. Praesent ullamcorper libero rhoncus neque elementum finibus.
                                <br />
                                <br />

                                Fusce ullamcorper non felis id condimentum. Nam nibh dolor, tempor sit amet efficitur ut, molestie et mi. Nunc euismod libero risus, vel iaculis augue consectetur at. In vitae nunc dui. Cras dignissim tristique magna sed fringilla. Etiam id urna elit. Morbi vehicula non magna eu porta. Ut consequat ultrices turpis sit amet hendrerit. Etiam et placerat sapien. Cras mattis varius justo sit amet mollis. In condimentum ultricies mauris, nec suscipit ex sagittis et. Sed in nunc lacus. Aliquam quis orci quis dolor dictum porttitor vehicula vitae mauris. Suspendisse potenti. Suspendisse metus velit, porta in est quis, dictum pellentesque tortor. Ut gravida vitae neque sit amet ultrices.
                                <br />
                            </BlogItem>

                        </Grid>
                    </Box>
                </div>
            </section>


            <h1 style={{ color: 'black', fontSize: '2em', margin: '.6em' }}>Name: {companyInfo.name}</h1>
            <h4 style={{ color: 'black', fontSize: '1em', margin: '.6em' }}>type: {companyInfo.type}</h4>
            <h4 style={{ color: 'black', fontSize: '1em', margin: '.6em' }}>slug: {companyInfo.slug}</h4>


            <br />

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

export async function getStaticProps() {
    let companyDetails = {};
    let slugListArray = {};
    let blogListArray = {};

    try {
        console.log(`Here at blogData`);
        const blogData = await blogHandler(`http://localhost:4500/blog/v2/fastfood/chicken`);

        companyDetails = blogData.find((entry) => entry.company);
        slugListArray = blogData.find((entry) => entry.slugs);
        blogListArray = blogData.find((entry) => entry.blogs);
    } catch (error) {
        console.error('Error fetching blog data:', error.message);
    }

    return {
        props: {
            companyDetails,
            slugListArray,
            blogListArray,
        },
    };
}

export default Slugs;
