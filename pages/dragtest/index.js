import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import DraggableComponent from './DraggableComponent';
import DropZoneComponent from './DropZoneComponent';
// https://blog.logrocket.com/drag-and-drop-react-dnd/

const isTouchDevice = () => {
    if (typeof window !== 'undefined' && "ontouchstart" in window) {
        return true;
    }
    return false;
};

const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;

const DragTest = () => {
    return (
        <DndProvider backend={backendForDND}>
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
