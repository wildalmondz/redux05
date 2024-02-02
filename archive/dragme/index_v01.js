import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5Backend from 'react-dnd-html5-backend'; // Import HTML5Backend directly
import DropZoneComponent from './DropZoneComponent';
import AlmondList from './AlmondList';
import { styled } from '@mui/material/styles';

const almondDetails = [
    {
        "almond_id": 1,
        "isDropped": 375,
        "isExpired": "active",
        "almond_available": "#21BC49",
        "almond_image": "This is where an image will go",
        "almond_dropped": "#dcfbfc"
    },
];

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

    const handleDrop = (item) => {
        // Check if an item has already been dropped
        if (!droppedItem) {
            // Set the dropped item and perform any additional actions
            setDroppedItem(item);
            alert(`Item "${item.name}" dropped!`);
        }
    };

    return (
        <DndProvider backend={!isServer ? MultiBackend : HTML5Backend} options={!isServer ? HTML5toTouch : null}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <ContainerAlmonds>
                        <strong>Drag and drop a token to item below. Click a token to reset.</strong>
                        <AlmondList almonds={almondDetails} isExpired={false} locked={null}/>
                    </ContainerAlmonds>
                </div>
                <div>
                    <h2>Drop Zone</h2>
                    <DropZoneComponent onDrop={handleDrop} droppedItem={droppedItem} />
                </div>
            </div>
        </DndProvider>
    );
};

export default DragMe;
