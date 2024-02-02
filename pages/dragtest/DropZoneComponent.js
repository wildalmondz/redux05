// dragtest/DropZoneComponent.js
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

const ItemTypes = {
    DRAGGABLE_ITEM: 'draggableItem',
};

const DropZoneComponent = () => {
    const [droppedItem, setDroppedItem] = useState(null);


    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.DRAGGABLE_ITEM,
        drop: (item) => {
            // Check if an item has already been dropped
            if (!droppedItem) {
                // Set the dropped item and perform any additional actions
                setDroppedItem(item);
                alert(`Item "${item.name}" dropped!`);
            }
        },
        canDrop: () => !droppedItem, // Allow drop only if no item has been dropped yet
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const containerStyle = {
        border: '2px dashed #aaa',
        padding: '16px',
        minHeight: '100px',
        backgroundColor: isOver ? '#f0f0f0' : 'white',
        pointerEvents: canDrop ? 'auto' : 'none', // Disable pointer events if an item is already dropped
    };

    return (
        <div ref={(node) => drop(node)} style={containerStyle}>
            {droppedItem ? (
                <div style={{ backgroundColor: 'black', color: 'white', textDecoration: 'line-through' }}>
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
/*
<div ref={(node) => drop(node)} style={containerStyle}>
    {droppedItem ? (
        <div style={{ backgroundColor: 'black', color: 'white', textDecoration: 'line-through' }}>
            Dropped Item: {droppedItem.name}
        </div>
    ) : (
        <div>
            Drop Zone
        </div>
    )}
</div>

 */

export default DropZoneComponent;
