import React from 'react';
import { DndProvider } from 'react-dnd';
import { MultiBackend } from 'react-dnd-multi-backend'
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import { TouchBackend } from 'react-dnd-touch-backend';
// import { HTML5toTouch } from 'rdndmb-html5-to-touch'
import DraggableComponent from './DraggableComponent';
import DropZoneComponent from './DropZoneComponent';

//         <DndProvider backend={!isServer ? TouchBackend : null}>

const DragTest = () => {
    const isServer = typeof window === 'undefined';

    return (
        <DndProvider backend={!isServer ? MultiBackend : null}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h2>Draggable Items</h2>
                    <DraggableComponent item={{ name: 'Item 1' }} />
                    <DraggableComponent item={{ name: 'Item 2' }} />
                    <DraggableComponent item={{ name: 'Item 3' }} />
                </div>
                <div>
                    <h2>Drop Zone</h2>
                    <DropZoneComponent />
                </div>
            </div>
        </DndProvider>
    );
};

export default DragTest;