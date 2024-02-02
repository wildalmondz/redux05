import React from 'react';
import { useEffect, useState } from 'react';
import pathDisplay from './pathDisplay.json';
import {useRouter} from "next/router";
import {styled} from "@mui/material/styles";
import axios from "axios";

const squareData = pathDisplay[0][0];

const PathButtons = styled('div')({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly',
    boxSizing: 'border-box',
    backgroundColor: 'ghostwhite',
    position: 'absolute',
    zIndex: '100'
})

const PathButton = styled('button')({
    padding:  '0',
    color: '#4F81B2',
    backgroundColor: 'white',
    flexBasis: 'fit-content',
    border: 'none !important',
    outline: 'none !important',
    boxShadow: 'none !important'
})

const RedirectImg = styled('img')({
    width: '25px',
    height: '25px'
})

const email='sample06@wildalmondstest.com';

const SquareMenu = () => {
    const [childId, setChildId] = useState('');
    const [squareStatus, setSquareStatus] = useState ('');
    const [squareUrl, setSquareUrl] = useState ('');
    const [imagePath, setImagePath] = useState ('');
    const [reserveUrl, setReserveUrl] = useState ('');
    const [mapUrl, setMapUrl] = useState ('');
    const [videoUrl, setVideoUrl] = useState ('');
    const router = useRouter();

    useEffect(() => {
        // child ID
        if ((squareData && squareData.child_id) && (childId === ''))  {
            setChildId(squareData.child_id);
        }
        // Square Status
        if ((squareData && squareData.square_status) && (squareStatus === ''))  {
            setSquareStatus(squareData.square_status);
        }
        // Square Url
        if ((squareData && squareData.square_url) && (squareUrl === ''))  {
            setSquareUrl(squareData.square_url);
        }
        //Image Path
        if ((squareData && squareData.image_path) && (imagePath === ''))  {
            setImagePath(squareData.image_path);
        }
        // Reserve Url
        if ((squareData && squareData.reserve_url) && (reserveUrl === ''))  {
            setReserveUrl(squareData.reserve_url);
        }
        // Map URL
        if ((squareData && squareData.map_url) && (mapUrl === ''))  {
            setMapUrl(squareData.map_url);
        }
        // Video URL
        if ((squareData && squareData.video_url) && (videoUrl === ''))  {
            setVideoUrl(squareData.video_url);
        }
    }, [squareData]);

    const NoUrl = () => {
        return null;
    }

    const navigateTo = (urlPath) => {
        router.push(urlPath);
    }

    const redirectReview = (childId, emailAddress) => {
        /*
        Call an action that returns new state for this instead of the call to apidev and redirect to invitation
         */
        axios.get(`http://localhost:4500/navigate/checkprior/${childId}/${emailAddress}`, {})
            .then((response) => {
                // alert(JSON.stringify(response));
                if (response.data !== 'undefined') {

                    if (response.data[0]) {
                        alert(`http://localhost:4500/navigate/setaccepted/${childId}/${response.data[0].foundEmailId}`);
                    }
                    // alert(`http://localhost:4500/setaccepted_v02/${childId}/${response.data[0].foundEmailId}`);
                    /*
                    		alert(`http://localhost:4500/navigate/setaccepted/${childId}/${response.data[0].foundEmailId}`);
				            // redirectUrl = 'http://localhost:3000/events/invitation/' + childId + '/' + response.data[0].foundEmailId + '/' + emailAddress;
				            redirectUrl = 'http://localhost:3000/events/invitedgame/' + childId + '/' + response.data[0].foundEmailId + '/' + emailAddress;
				            axios.post(`http://localhost:4500/invited/setaccepted_v02/${childId}/${response.data[0].foundEmailId}`, {});
				            // window.open('http://localhost:3000/events/invitation/' + childId + '/' + response.data[0].foundEmailId + '/' + emailAddress);
				            // redirectMe(redirectUrl);
                     */
                    window.open('http://localhost:3000/events/invitation/' + childId + '/' + response.data[0].foundEmailId + '/' + emailAddress);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const Url = ({urlPath, name, img, childId, email}) => {
        if (name === 'Review') {
            return (
                <PathButton>
                    <RedirectImg
                        src={img}
                        alt="Web"
                        onClick={() => redirectReview(childId, email)}
                    />
                </PathButton>
            )
        }
        else {
            return (
                <PathButton>
                    <RedirectImg
                        src={img}
                        alt="Web"
                        onClick={() => navigateTo(urlPath)}
                    />
                </PathButton>
            );
        }
    }

    const MapUrl = ({ hasUrl, name }) => {
        const mapUrl = hasUrl;
        const buttonName = name;
        if (mapUrl) {
            return <Url
                urlPath={mapUrl}
                name={buttonName}
                img={'https://wildalmonds.com/api/uploads/d7e3b622-3fa5-4ce3-8943-0fca05377c74_map.jpg'}
            />;
        } else { return <NoUrl />; }
    }

    const ReserveUrl = ({hasUrl, name}) => {
        const reserveUrl = hasUrl;
        const buttonName = name;
        if (reserveUrl) {
            return <Url
                urlPath={reserveUrl}
                name={buttonName}
                img={'https://wildalmonds.com/api/uploads/50b154a7-ec8c-4c22-8e44-07600f9dd7b0_schedule.jpg'}
            />;
        } else { return <NoUrl />; }
    }

    const SquareUrl = ({hasUrl, name }) => {
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

    const ReviewUrl = ({hasUrl, name, childId, email }) => {
        const reviewUrl = hasUrl;
        if (reviewUrl) {
            return <Url
                urlPath={reviewUrl}
                name={name}
                img={'https://wildalmonds.com/api/uploads/3c0e4e77-2880-416c-bf73-b7e3c3de977d_fwdReview.jpeg'}
                childId={childId}
                email={email}
            />;
        }
        else { return <NoUrl />; }
    }

    const VideoUrl = ({hasUrl, name }) => {
        // alert('Hello Video: ' + hasUrl + 'Name: ' + name);
        const videoUrl = hasUrl;
        if (videoUrl) {
            return <Url
                img={'https://wildalmonds.com/api/uploads/b04ae037-9e9e-4489-8cce-ca052e2b032c_video.jpg'}
                urlPath={videoUrl}
            />;
        }
        else { return <NoUrl />; }
    }

    return (
        <div>
            <PathButtons>
                <PathButton><ReviewUrl hasUrl={childId} name='Review' childId={childId} email={email}/></PathButton>
                <PathButton><SquareUrl hasUrl={squareUrl} name='Web Site' /></PathButton>
                <PathButton><MapUrl hasUrl={mapUrl} name='Map' /></PathButton>
                <PathButton><ReserveUrl hasUrl={reserveUrl} name='Scheduling' /></PathButton>
                <PathButton><VideoUrl hasUrl={videoUrl} name='Video' /></PathButton>
            </PathButtons>
        </div>
    );
};

export default SquareMenu;