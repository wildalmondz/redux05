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

    const index = dataArray.findIndex(item => item.id === idNumber);
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

 // const PathDisplay = ({ companyDetails, slugListArray, blogListArray, blogContent, urlparse, currentId, likeCount }) => {
const PathDisplay = ({ emailId }) => {

    /*
    const companyInfo = companyDetails.company[0];

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
    const dataArray = blogListArray.blogs;

     */

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
                            <Grid item xs={6}>
                                <StyledItem>
                                    <BackgroundImage />
                                    <OverlayText>SquareName?</OverlayText>
                                </StyledItem>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>Was InviteBlog</Item>
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
                                <div id='blog-top'>
                                    <div id='blog-header'>
                                        <div id='blog-title'><strong>Title?</strong></div>
                                        <div id='blog-author'><strong>By: </strong><strong>Some Data?</strong></div>
                                        <div id='blog-date'>A date?</div>
                                    </div>
                                </div>
                            </Item>
                        </Grid>
                    </Box>
                </div>
                <div style={{ borderTop: '1.5px solid #000', margin: '4em 0' }} />
                <div>
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
                                lineHeight: '1.5',  // Set line height for better readability
                            }}>
                            </BlogItem>

                        </Grid>
                    </Box>
                </div>
                <div style={{ borderTop: '1px solid #000', margin: '3em 0' }} />
            </section>
        </Layout>
    );
};

export default PathDisplay;