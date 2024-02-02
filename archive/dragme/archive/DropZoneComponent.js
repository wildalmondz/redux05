// dragtest/DropZoneComponent.js
import React from 'react';
import { useDrop } from 'react-dnd';

const ItemTypes = {
    DRAGGABLE_ITEM: 'draggableItem',
};

const DropZoneComponent = ({ onDrop, droppedItem }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.DRAGGABLE_ITEM,
        drop: (item) => {
            onDrop(item);
        },
        canDrop: () => !droppedItem, // Allow drop only if no item has been dropped yet
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const handleSquareClick = () => {
        alert('Hello Square Click!');
        // Add any additional logic you want to perform on square click
    };

    const containerStyle = {
        border: '2px dashed #aaa',
        padding: '16px',
        minHeight: '100px',
        backgroundColor: isOver ? '#f0f0f0' : 'white',
        // pointerEvents: canDrop ? 'auto' : 'none', // Disable pointer events if an item is already dropped
    };

    return (
        <div onClick={handleSquareClick} ref={drop} style={containerStyle}>
            {droppedItem ? (
                <div>
                    Dropped Item: {droppedItem.name}
                </div>
            ) : (
                <div>
                    Drop Zone
                </div>
            )}
        </div>
    );
};

export default DropZoneComponent;
