// EventHeader.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import AlmondList from './AlmondList';
import SquareList from './SquareList';
import squareDetails from './squareDetails.json';
import ContainerNoDivision from './containerNoDivision';
import PicksComments from "./PicksComments";
import HeadsUp from "./HeadsUp";
import TextField from "@mui/material/TextField";
import {useRouter} from "next/router";
import PathDisplay from "./PathDisplay";

const isTouchDevice = () => {
    if (typeof window !== 'undefined' && "ontouchstart" in window) {
        return true;
    }
    return false;
};

const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;

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

const StyledItem = styled('div')({
    height: '100%', // Adjust as needed
    border: '1px solid #000', // Example border for visualization
    position: 'relative',
});


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

const ContainerAlmonds = styled('section')({
    margin: '.5em',
    padding: '2px',
    textAlign: 'center',
    alignItems: 'center',
    position: 'relative',
    display: 'grid',
    justifyContent: 'space-around',
    border: '1px dashed gainsboro',
    overflowY: 'scroll',
    backgroundColor: 'ghostwhite',
    color: 'silver',
    maxHeight: '70px'
})

const EventContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    borderTop: '1.5px solid #000',
    padding: '.25em 0',
});

const EventHeader = ({
                almonds,
                squares,
                foundUserId,
                gameId,
                email,
                lockedStatus,
                expired,
                picksRemaining,
                curLocked,
                setCurLocked,
                wildAlmond
        }) => {

    const [droppedItem, setDroppedItem] = useState(null);
    const [almondList, setAlmonds] = useState(null);
    const [divisions, setDivision] = useState(null);
    const [squareDescription, setSquareDescription] = useState('');
    const [squareId, setSquareId] = useState('');
    const [squareName, setSquareName] = useState(null);
    const [squareCount, setSquareCount] = useState(null);
    const [squareComment, setSquareComment] = useState(null);
    const [activeCount, setActiveCount] = useState(null);
    const [isSoftSave, setIsSoftSave] = useState(false);
    const [softSquareId, setSoftSquareId] = useState('');
    const [hasChanges, setHasChanges] = useState(false);
    const [textFieldValue, setTextFieldValue] = useState('');

    const [foundAlmonds, setFoundAlmonds] = useState(0);

    const router = useRouter();

    if ((almonds && foundAlmonds === 0) && (almondList === null)) {
        // Access almonds array properties here
        setAlmonds(almonds);
        setFoundAlmonds(1);
    }

    /*
    if ((almonds) && (almondList === null)) {
       // setAlmonds(almonds);
    }

     */

    //if ((squareDetails && squareDetails.length > 0) && (squareDetails.squares) && (divisions === null)) {
    if ((squareDetails && squareDetails.length > 0) && (squareDetails.squares) && (divisions === null)) {
        setDivision(squareDetails.squares.withDivision);
    }

    if ((squareDetails) && (squareDetails.squares) && (squareCount === null)) {
        setSquareCount(squareDetails.squares.squareCount);
    }

    if ((squareDetails) && (squareDetails.squares) && (squareCount === null)) {
        setActiveCount(squareDetails.squares.activeSquareCnt);
    }

    if (divisions != null) { console.log('Divisions found: ' + divisions); }

    function getSquareById(squares, squareId) {
        console.log('[ Event Header looking for ] '+ squareId)
        return squares.find(square => square.square_id === squareId);
    }

    if (hasChanges === true) { // alert('Change found?: In event header => ' + hasChanges + ' <= ');
         }

    const handleDrop = async (item) => {
        console.log('\n\nHandle Drop Item: \n\n' + JSON.stringify(item) + '\n\n\n');
        if (droppedItem) {
            console.log('Found a dropped item! ' + JSON.stringify(droppedItem));
        } else (console.log('No dropped item'));

        try {

            // Perform the asynchronous operation (e.g., axios request)
            const res = await axios.post(`http://localhost:4500/pick/setpick_v3/null/${gameId}/${foundUserId}/${item.name}/${item.squareId}`);

            // Handle the response
            if (res.data.user_id !== undefined && /^20000/.test(res.data)) {
                setLoggedIn(true);
                setUserName(res.data.username); // Update with the actual username property
            } else {
                console.log('Pick made');
                router.push(`/events/invitedgame/${gameId}/${foundUserId}/${email}`)
            }
        } catch (err) {
           console.error(err);
        }
    };

    const canDeletePick = async (item) => {
        console.log(`\n\n\n\n Expired!  ${expired} \n\n\n\n`);
        if ((expired !== 'expired') && (lockedStatus === 'unlocked')) {

            try {
                const res = await axios({
                    method: 'post',
                    // withCredentials: true,
                    url: `http://localhost:4500/pick/deletepick/${gameId}/${foundUserId}/${item.name}`,
                });
                if (res) {
                    setDroppedItem(false);
                    console.log(JSON.stringify(res));  // Assuming the data you need is in res.data

                    setTimeout(() => {
                        router.push(`/events/invitedgame/${gameId}/${foundUserId}/${email}`)
                    }, 250);

                }

            } catch (err) {
                console.error(err);
            }
        }
        return true;
    }

    const handleClick = async (squareId) => {
        const currentSquare = getSquareById(squares, squareId);
        setSquareId(currentSquare.square_id);
        setSquareDescription(currentSquare.square_description);
        setSquareName(currentSquare.square_name);
        setSquareDescription(currentSquare.square_description);
        //setSquareComment(currentSquare.userComment) // default way of getting square comment

        if(hasChanges) {

            let cleanInsert;

            try {
                cleanInsert = encodeURIComponent(textFieldValue);
                cleanInsert = cleanInsert.replace(/[/]/g, '%2F')
                    .replace(/[?]/g, '%3F')
                    .replace(/[']/g, '%27')
                    .replace(/["]/g, '%22')
                    .replace(/[#]/g, '%23');

                await axios.post(`http://localhost:4500/pick/setsquarecomment_v2/${foundUserId}/${gameId}/${softSquareId}/${isSoftSave}/${cleanInsert}`, { textFieldValue });
                console.log('Content saved successfully!' + textFieldValue);
                setHasChanges(false); // Reset changes after saving
                setIsSoftSave(false); // Reset changes after saving

            } catch (error) {
                console.error('Error saving content:', error);
            }
         }

    };

    const lockPicks = (gameId, userId)  => {
        console.log(`\n\n\n\n In EventHeader [[ GameId! ${gameId} UserId => ${userId} ]]\n\n\n\n`);
    }

    return (
        <>
            {/* Event display section */}
            <EventContainer>
                        <Grid container spacing={0}>
                            <PathDisplay/>
                            {/* Event display left item */}
                            <Grid item xs={6}>
                                <StyledItem>
                                    <BackgroundImage />
                                    <OverlayText>
                                        {squareName}
                                    </OverlayText>
                                    <Item>
                                        <OverlayDescription>
                                            <TextField
                                                variant="standard"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                value={squareDescription}
                                                InputProps={{
                                                    disableUnderline: true,
                                                }}
                                                />
                                        </OverlayDescription>
                                    </Item>
                                </StyledItem>
                            </Grid>
                            {/* Event display right item */}
                            <Grid item xs={6}>
                                    <CommentSection>
                                        <PicksComments
                                            foundComment={squareComment}
                                            userId={foundUserId}
                                            gameId={gameId}
                                            squareId={squareId}
                                            isSoftSave={isSoftSave}
                                            setIsSoftSave={setIsSoftSave}
                                            hasChanges={hasChanges}
                                            setHasChanges={setHasChanges}
                                            softSquare={softSquareId}
                                            setIsSoftSquare={setSoftSquareId}
                                            textFieldValue={textFieldValue}
                                            setTextFieldValue={setTextFieldValue}
                                        >
                                        </PicksComments>
                                    </CommentSection>
                            </Grid>
                        </Grid>
            </EventContainer>
                        <Grid item xs={6}>
                        <HeadsUp
                            picksRemaining={picksRemaining}
                            lockedStatus={lockedStatus}
                            gameId={gameId}
                            userId={foundUserId}
                            lockedPicks={lockPicks}
                            expired={expired}
                            curLocked={curLocked}
                            setCurLocked={setCurLocked}
                            wildAlmond={wildAlmond}
                        />
                        </Grid>
                <div style={{ borderTop: '1.5px solid #000', margin: '.25em 0' }} />
                <div>
                    {/*  */}
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid item xs={6}>
                            <DndProvider backend={backendForDND}>
                                <Box sx={{ flexGrow: 1 }}>
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
                                            <ContainerAlmonds>
                                                <strong>Drag and drop a token to item below. Click a token to reset.</strong>
                                                <AlmondList
                                                    almonds={almonds}
                                                    gameId={gameId}
                                                    userId={foundUserId}
                                                    email={email}
                                                    droppedItem={droppedItem}
                                                    lockedStatus={lockedStatus}
                                                    expired={expired}
                                                    handleDrop={handleDrop}
                                                    canDeletePick={canDeletePick}
                                                    curLocked={curLocked}
                                                >
                                                </AlmondList>
                                            </ContainerAlmonds>
                                        </Item>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div>
                                            {(divisions === true) ?
                                                <section className="container-squares">
                                                    <h4>Container Squares with divisions</h4>
                                                </section>
                                                :
                                                <ContainerNoDivision>
                                                    <h1>Container Squares no division</h1>
                                                    <SquareList
                                                        almonds={almonds}
                                                        handleDrop={handleDrop}
                                                        handleClick={handleClick}
                                                        droppedItem={droppedItem}
                                                        squareDetails={squares}
                                                        gameId={gameId}
                                                        gameName={'Sample Wines'}
                                                        userId={foundUserId}
                                                        email={email}
                                                        division={divisions}
                                                        activeSquares={activeCount}
                                                        squareCount={squareCount}
                                                        isSoftSave={isSoftSave}
                                                        setIsSoftSave={setIsSoftSave}
                                                        hasChanges={hasChanges}
                                                        setHasChanges={setHasChanges}
                                                        squareComment={squareComment}
                                                        setSquareComment={setSquareComment}
                                                        textFieldValue={textFieldValue}
                                                    />
                                                </ContainerNoDivision>
                                            }
                                        </div>
                                    </Grid>
                                </Box>
                            </DndProvider>
                        </Grid>
                    </Box>
                </div>
                <div style={{ borderTop: '1px solid #000', margin: '3em 0' }} />
        </>
    );
};

export default EventHeader;