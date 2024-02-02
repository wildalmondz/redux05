// dragtest/DraggableComponent.js
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const DraggableComponent = ({ item }) => {
    const [hasBeenDropped, setHasBeenDropped] = useState(false);

    if (!item || hasBeenDropped) {
        // Handle the case where item is not defined or has been dropped
        return null;
    }

    const [{ isDragging }, drag] = useDrag({
        type: 'draggableItem', // Make sure the type is defined
        item: { ...item },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const draggedStyle = {
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        border: '1px solid #ccc',
        padding: '8px',
        marginBottom: '8px',
        backgroundColor: isDragging ? 'transparent' : 'inherit', // Set background color to black when dragging
        color: isDragging ? 'white' : 'inherit', // Set text color to white when dragging
        textDecoration: isDragging ? 'line-through' : 'none', // Add strikethrough when dragging
    };


    return (
        <div ref={(node) => drag(node)} style={draggedStyle}>
            {item.name}
        </div>
    );
};

export default DraggableComponent;

/*
    return (
        <div ref={(node) => drag(node)} style={draggedStyle}>
            {item.name}
        </div>
    );
 */
