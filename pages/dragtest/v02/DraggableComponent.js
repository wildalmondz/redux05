// DraggableComponent.js
import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableComponent = ({ item }) => {
    if (!item) {
        // Handle the case where item is not defined
        return null;
    }

    const [{ isDragging }, drag] = useDrag({
        type: 'draggableItem', // Make sure the type is defined
        item: { ...item },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                border: '1px solid #ccc',
                padding: '8px',
                marginBottom: '8px',
            }}
        >
            {item.name}
        </div>
    );
};

export default DraggableComponent;
