// dragtest/index.old
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { MultiBackend } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import DraggableComponent from './DraggableComponent';
import DropZoneComponent from './DropZoneComponent';
import { styled } from '@mui/material/styles';

const almondDetails =
    [
        {
            "almond_id": 1,
            "isDropped": 375,
            "isExpired": "active",
            "almond_available": "#21BC49",
            "almond_image": "This is where an image will go",
            "almond_dropped": "#dcfbfc"
        },
        {
            "almond_id": 2,
            "isDropped": null,
            "isExpired": "active",
            "almond_available": "#7695f5",
            "almond_image": "This is where an image will go",
            "almond_dropped": "#d6e0ff"
        },
        {
            "almond_id": 3,
            "isDropped": null,
            "isExpired": "active",
            "almond_available": "#FFBD33",
            "almond_image": "This is where an image will go",
            "almond_dropped": "#fffad6"
        },
        {
            "almond_id": 4,
            "isDropped": 347,
            "isExpired": "active",
            "almond_available": "#E26044",
            "almond_image": "This is where an image will go",
            "almond_dropped": "#efd7fc"
        },
        {
            "almond_id": 5,
            "isDropped": null,
            "isExpired": "active",
            "almond_available": "#9232a8",
            "almond_image": "This is where an image will go",
            "almond_dropped": "#fff0e6"
        },
        {
            "almond_id": 6,
            "isDropped": null,
            "isExpired": "active",
            "almond_available": "#bf8040",
            "almond_image": "This is where an image will go",
            "almond_dropped": "#f9f2ec"
        },
        {
            "almond_id": 7,
            "isDropped": null,
            "isExpired": "active",
            "almond_available": "#969d70",
            "almond_image": "This is where an image will go",
            "almond_dropped": null
        },
        {
            "almond_id": 8,
            "isDropped": null,
            "isExpired": "active",
            "almond_available": "#982e23",
            "almond_image": "This is where an image will go",
            "almond_dropped": null
        },
        {
            "almond_id": 9,
            "isDropped": 339,
            "isExpired": "active",
            "almond_available": "#b9b46e",
            "almond_image": "This is where an image will go",
            "almond_dropped": null
        },
        {
            "almond_id": 10,
            "isDropped": 356,
            "isExpired": "active",
            "almond_available": "#987123",
            "almond_image": "This is where an image will go",
            "almond_dropped": null
        }
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

const AlmondList = styled('div')({
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    textAlign: 'center',
    margin: 0
})

const DragTest = () => {
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
        <DndProvider backend={!isServer ? MultiBackend : null} options={!isServer ? HTML5toTouch : null}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <ContainerAlmonds>
                        <strong>Drag and drop a token to item below. Click a token to reset.</strong>
                        <AlmondList>
                        <DraggableComponent
                            item={{ name: '1' }}
                            isDropped={true}
                            game_id={'5ce32b4b-198b-4c5c-ae9e-98a76d319d5c'}
                            userId={'1ccb9963-00fe-4fb8-85b7-5633f4aa8c0e'}
                            locked={true}
                            tokenColor={'red'}
                        />
                        <DraggableComponent
                            item={{ name: '2' }}
                            isDropped={false}
                            dropped={droppedItem}
                            game_id={'5ce32b4b-198b-4c5c-ae9e-98a76d319d5c'}
                            userId={'1ccb9963-00fe-4fb8-85b7-5633f4aa8c0e'}
                            locked={true}
                            tokenColor={'blue'}
                        />
                        <DraggableComponent
                            item={{ name: '3' }}
                            isDropped={true}
                            dropped={droppedItem}
                            game_id={'5ce32b4b-198b-4c5c-ae9e-98a76d319d5c'}
                            userId={'1ccb9963-00fe-4fb8-85b7-5633f4aa8c0e'}
                            locked={true}
                            tokenColor={'green'}
                        />
                        </AlmondList>
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

export default DragTest;
