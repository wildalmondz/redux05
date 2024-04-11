// dragme/index.old
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
// import { MultiBackend }  from 'react-dnd-multi-backend';
// import { HTML5toTouch }  from 'rdndmb-html5-to-touch';
// import DropZoneComponent from './DropZoneComponent';
import AlmondList from './AlmondList';
import SquareList from './SquareList';
import almondDetails from './almondDetails.json';
import squareDetails from './squareDetails.json';
import pathDisplay from './pathDisplay.json';
import ContainerNoDivision from './containerNoDivision';

//                             <DropZoneComponent type={ItemTypes.ALMOND} onDrop={handleDrop} droppedItem={droppedItem} />

const isTouchDevice = () => {
    if (typeof window !== 'undefined' && "ontouchstart" in window) {
        return true;
    }
    return false;
};

const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;

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

const ContainerAlmonds = styled('section')({
    margin: '.5em',
    padding: '2px',
    textAlign: 'center',
    alignItems: 'center',
    position: 'relative',
    display: 'grid',
    justifyContent: 'center',
    border: '1px dashed gainsboro',
    overflowY: 'scroll',
    backgroundColor: 'ghostwhite',
    color: 'silver',
    maxHeight: '70px'
})

const DragMe = () => {
    const isServer = typeof window === 'undefined';
    const [droppedItem, setDroppedItem] = useState(null);
    const [divisions, setDivision] = useState(null);
    const [squareCount, setSquareCount] = useState(null);
    const [activeCount, setActiveCount] = useState(null);


    if ((squareDetails) && (squareDetails.squares) && (divisions === null)) {
        setDivision(squareDetails.squares.withDivision);
    }

    if ((squareDetails) && (squareDetails.squares) && (squareCount === null)) {
        setSquareCount(squareDetails.squares.squareCount);
    }

    if ((squareDetails) && (squareDetails.squares) && (squareCount === null)) {
        setActiveCount(squareDetails.squares.activeSquareCnt);
    }

    if (divisions != null) { console.log('Divisions found: ' + divisions); }
    if (squareCount != null) { console.log('Squares found: ' + squareCount); }
    if (activeCount != null) { console.log('Active found: ' + activeCount); }


    const handleDrop = (item) => {
        // Check if an item has already been dropped
        if (!droppedItem) {
            // Set the dropped item and perform any additional actions
            setDroppedItem(item);
            // alert(`Item "${item.name}" dropped!`);
            alert(JSON.stringify(item));
        }
    };

    //         <DndProvider backend={!isServer ? MultiBackend : null} options={!isServer ? HTML5toTouch : null}>
    //                             <Squares game_id={game_id} gameName={gameName} userId={userId} email={email}/>

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
                    </Box>
                </div>
                <div style={{ borderTop: '1.5px solid #000', margin: '1.5em 0' }} />
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
                                                <AlmondList almonds={almondDetails} isExpired={false} locked={null}/>
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
                                                        handleDrop={handleDrop}
                                                        droppedItem={droppedItem}
                                                        squareDetails={squareDetails.squares.squareDetails}
                                                        game_id={'5ce32b4b-198b-4c5c-ae9e-98a76d319d5c'}
                                                        gameName={'Sample Wines'}
                                                        userId={'1ccb9963-00fe-4fb8-85b7-5633f4aa8c0e'}
                                                        email={'sample06@wildalmondstest.com'}
                                                        division={divisions}
                                                        activeSquares={activeCount}
                                                        squareCount={squareCount}
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
            </section>
        </Layout>
    );
};

export default DragMe;