import React from 'react';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import PicksComments from "../events/PicksComments";
import axios from 'axios';
import {useRouter} from "next/router";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const ButtonRow = styled('div')({
    display: 'flex',
    justifyContent: 'space-evenly',
    boxSizing: 'border-box',
    backgroundColor: 'ghostwhite',
    zIndex: '100',
    width: '100%'
});

const EventContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    borderTop: '1.5px solid #000',
    padding: '.25em 0',
});

const EventsArea = styled('section')({
});

const OverlayDescription = styled('div')({
    width: '100%',
    height: '0%',
    paddingTop: '.5em',
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'black', // Text color
    zIndex: 1, // Ensure text appears above the image
});

const OverlayText = styled('h3')({
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'black', // Text color
    zIndex: 1, // Ensure text appears above the image
});

// div[id="pathChild"] {

const PathButton = styled('button')({
    paddingLeft:  '1em',
    paddingRight:  '1em',
    color: '#4F81B2',
    backgroundColor: 'white',
    flexBasis: 'fit-content',
    border: 'none !important',
    outline: 'none !important',
    boxShadow: 'none !important'
});

const PathChild = styled('div')({
    paddingTop: '0.25em',
    boxSizing: 'border-box',
    display: 'flex',
    cursor: 'pointer',
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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    height: '12em',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: '1px solid green', // Example border for visualization
}));

const CommentSection = styled('div')({
    backgroundImage: `url('https://images.pconst BackgroundImage = styled('div')({
    backgroundImage: \`url('https://images.pexels.com/photos/1277181/pexels-photo-1277181.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500')\`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    });exels.com/photos/1277181/pexels-photo-1277181.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
});

const RedirectImg = styled('img')({
    width: '20px',
    height: '20px',
});


const PathDisplay = () => {

    const childId ='5ce32b4b-198b-4c5c-ae9e-98a76d319d5c';
    const childUrl = 'https://wildalmonds.com/';
    const gameId ='5ce32b4b-198b-4c5c-ae9e-98a76d319d5c';
    const emailId ='1ccb9963-00fe-4fb8-85b7-5633f4aa8c0e';
    const userId ='1ccb9963-00fe-4fb8-85b7-5633f4aa8c0e';
    const emailAddr ='sample06@wildalmondstest.com';

    const router = useRouter();

    function redirectMe(squareUrl) {
        window.open(`${squareUrl}`);
    }

    function NoUrl(props) {
        return null;
    }

    function Url({img, urlPath}) {
        return (
            <PathButton>
                <RedirectImg
                     src={img}
                     alt="Web"
                     onClick={() => redirectMe(urlPath)}
                />
            </PathButton>
        );
    }

    const redirectReview = (childId, emailAddress) => {
        axios.get(`http://localhost:4500/games/checkprior/${childId}/${emailAddress}`, {})
            .then((response) => {
                if (response.data !== 'undefined') {
                    const redirectUrl = 'http://localhost:3000/events/invitation/' + childId + '/' + response.data[0].foundEmailId + '/' + emailAddress;
                    router.push(redirectUrl);
                    // router.push(`/blogs/${structuredUrl.type}/${structuredUrl.slug}`);
                    // window.open('http://localhost:3000/events/invitation/' + childId + '/' + response.data[0].foundEmailId + '/' + emailAddress);
                    // redirectMe(redirectUrl);
                    // openChildUrl(redirectUrl);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const Review = (name) => {
        const buttonName = name;
        const refPath = childUrl + '/' + emailId + '/' + emailAddr;

        if (refPath) {
            return <ReviewUrl
                childId={childId}
                email={emailAddr}
                name={buttonName}
                img={'https://wildalmonds.com/api/uploads/3c0e4e77-2880-416c-bf73-b7e3c3de977d_fwdReview.jpeg'}
            />;
        }
        return <NoUrl />;
    }

    function ReviewUrl(props) {
        return (
            <PathButton>
                <RedirectImg
                     src={props.img}
                     alt="Web"
                     // onClick={() => redirectReview(props.childId, props.email)}
                     onClick={() => alert(childId, emailAddr)}
                />
            </PathButton>
        );
    }

    const ChildUrl = (props) => {
        const childId = "test";
        const childUrl = "test";

        const buttonName = props.name;
        if ((childId != undefined) || (childId != null)) {

            return <Review
                childUrl={childUrl}
                childId={childId}
                emailId={userId}
                email={emailAddr}
                name={buttonName}  />;
        }
        return null;
    }

    const MapUrl = (hasUrl, name) => {
        const mapUrl = 'https://www.google.com/maps/dir//14300+SE+Petrovitsky+Rd,+Renton,+WA+98058/@47.4448039,-122.2320365,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x5490677c55e8d299:0x73d725672b7bcce3!2m2!1d-122.1495207!2d47.444732?entry=ttu';
        const buttonName = name;
        if (mapUrl) {
            return <Url
                urlPath={mapUrl}
                name={buttonName}
                img={'https://wildalmonds.com/api/uploads/d7e3b622-3fa5-4ce3-8943-0fca05377c74_map.jpg'}
            />;
        }
        return <NoUrl />;
    }

    const ReserveUrl = (hasUrl, name) => {
        const reserveUrl = hasUrl;
        const buttonName = name;
        if (reserveUrl) {
            return <Url
                urlPath={reserveUrl}
                name={buttonName}
                img={'https://wildalmonds.com/api/uploads/50b154a7-ec8c-4c22-8e44-07600f9dd7b0_schedule.jpg'}
            />;
        }
        return <NoUrl />;
    }

    const SquareUrl = (hasUrl, name) => {
        const squareUrl = hasUrl;
        const buttonName = name;
        if (squareUrl) {
            return <Url
                urlPath={squareUrl}
                name={buttonName}
                img={'https://wildalmonds.com/api/uploads/711df310-0bf0-4895-aa17-c1794c33c01b_shop.jpg'}
            />;
        }
        return <NoUrl />;
    }

    const VideoUrl = (hasUrl, name) => {
        const videoUrl = hasUrl;
        const buttonName = name;
        if (videoUrl) {
            return <Url
                urlPath={videoUrl}
                name={buttonName}
                img={'https://wildalmonds.com/api/uploads/b04ae037-9e9e-4489-8cce-ca052e2b032c_video.jpg'}
            />;
        }
        return <NoUrl />;
    }

    return (
        <>
            <ButtonRow>
                {(childId != null) ? (
                    <PathChild>
                        <div className="dot"></div>
                        <ChildUrl
                            child_id={childId}
                            childUrl={childUrl}
                            gameId={gameId}
                            emailId={emailId}
                            userId={userId}
                            email={emailAddr}
                            name='Review'
                        />
                        <MapUrl hasUrl={childUrl} name='Map' />
                        <ReserveUrl hasUrl={childUrl} name='Scheduling' />
                        <VideoUrl hasUrl={childUrl}  name='Video' />
                        <SquareUrl hasUrl={childUrl} name='Web Site' />
                    </PathChild>
                ) : ''}
            </ButtonRow>
        </>
    );
};

export default PathDisplay;
