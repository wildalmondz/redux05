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
        if ((lastDroppedItem) || (isAd)) {
            return false;
        }
        else {
            return true;
        }
    },
    drop(props, monitor) {
        // 2/21/19 Line below needed to print Almond name on Square
        props.onDrop(monitor.getItem());
        // needed to return the square_id back to Almond endDrag
        return { name: props.square_id };
    },
};
/*
const DropZoneComponent = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'draggableItem',
    drop: (item, monitor) => {
      onDrop(item);
      alert(`Item "${item.name}" dropped!`); // Alert when an item is dropped
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  });
 */

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        getDropResult: monitor.getDropResult(),
        itemType: monitor.getItem(),
    };
}

const DropZoneComponent = ({ onDrop }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'draggableItem',
        drop: (item, monitor) => {
            //onDrop(item);
            alert(`Item "${item.name}" dropped!`); // Alert when an item is dropped
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
            connectDropTarget: connect.dropTarget(),
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

export default DropZoneComponent(ItemTypes.ALMOND, squareTarget, collect);
