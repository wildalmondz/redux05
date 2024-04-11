// dragme/index.old
import React, { useState } from 'react';
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
// import ItemTypes from './ItemTypes';
import { styled } from '@mui/material/styles';

//                             <DropZoneComponent type={ItemTypes.ALMOND} onDrop={handleDrop} droppedItem={droppedItem} />

const isTouchDevice = () => {
    if (typeof window !== 'undefined' && "ontouchstart" in window) {
        return true;
    }
    return false;
};

const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;

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
        <DndProvider backend={backendForDND}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <ContainerAlmonds>
                        <strong>Drag and drop a token to item below. Click a token to reset.</strong>
                        <AlmondList almonds={almondDetails} isExpired={false} locked={null}/>
                    </ContainerAlmonds>
                </div>
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
            </div>
        </DndProvider>
    );
};

export default DragMe;