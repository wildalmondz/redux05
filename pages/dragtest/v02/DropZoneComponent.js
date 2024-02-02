
// DropZoneComponent.js
import React from 'react';
import { useDrop } from 'react-dnd';

let lastDroppedItem;
let isAd = false;

const ItemTypes = {
    ALMOND: 'almond',
};

const squareTarget = {
    canDrop(props) {
        if (lastDroppedItem || isAd) {
            return false;
        } else {
            return true;
        }
    },
    drop(props, monitor) {
        props.onDrop(monitor.getItem());
        return { name: props.square_id };
    },
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        getDropResult: monitor.getDropResult(),
        itemType: monitor.getItem(),
    };
}

const DropZoneComponent = ({ onDrop, connectDropTarget, canDrop }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'draggableItem',
        drop: (item, monitor) => {
            alert(`Item "${item.name}" dropped!`);
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
            connectDropTarget: connectDropTarget,
        }),
    });

    return (
        <div
            ref={drop}
            style={{
                border: '2px dashed #aaa',
                padding: '16px',
                minHeight: '100px',
                backgroundColor: isOver ? '#f0f0f0' : 'white',
            }}
        >
            Drop Zone
        </div>
    );
};

export default DropZoneComponent;
