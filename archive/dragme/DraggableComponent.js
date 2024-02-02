// dragtest/DraggableComponent.js
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

export const canDragAlmond = almondId => function () {
    if (debugLevel > 5) { console.log(`???  Can Drag  ???   ${almondId}`); }
};

const EachAlmond = styled('div')({
    padding: '0.5rem 1rem',
    marginRight: '.5rem',
    marginBottom: '.5rem',
    cursor: 'pointer',
    float: 'left',
})

const OuterDot = styled('span')({
    height: '40px',
    width: '40px',
    backgroundColor: 'slategray',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'thin solid gray',
})

const InnerDot = styled('span')({
    fontSize: '20px',
    height: '34px',
    width: '34px',
    border: 'thin solid',
    borderRadius: '50%',
    backgroundImage: 'url(https://wildalmonds.com/api/uploads/725c78bb-ae08-4ed7-93cb-3fb6becd7d04_subtle-dots.png)',
    margin: '0 auto',
})

function canMoveAlmond(isDropped, isExpired, locked) {
    if (locked !== null) {
        confirmAlert({
            title: `This event has been locked => ${locked}`,
            message: '',
            buttons: [
                {
                    label: 'Ok',
                    onClick: () => {},
                },
            ],
        });
    }
    if (isDropped) {
        confirmAlert({
            title: 'Almond has already been dropped',
            message: '',
            buttons: [
                {
                    label: 'Ok',
                    onClick: () => {},
                },
            ],
        });
    }
    if (isExpired === 'expired') {
        confirmAlert({
            title: `This tournament is no longer allowing changes as of ${isExpired}`,
            message: '',
            buttons: [
                {
                    label: 'Ok',
                    onClick: () => {},
                },
            ],
        });
    }
    return true;
}

const DraggableComponent = ({ item, isDropped, dropped, tokenColor }) => {
    const [open, setOpen] = useState(false);
    const [droppedItem, setDroppedItem] = useState(false);
    const [canDrop, setDrop] = useState(true);
    const [curColor, setCurColor] = useState(tokenColor);


    // const isActive = isOver && canDrop;
    const almondBoarder = `1px solid`;
    let backgroundColor = '#edebeb';
    let border = 'black';
    let color = '#705856';
    let opacity = 1;

    if (!item) { return null; }
    if (dropped == true) { setDroppedItem(dropped) };

    if ((isDropped == true) && (canDrop != false)) {
        setDrop(false);
        console.log('Is Dropped is ' + isDropped);
        setCurColor(backgroundColor);
    };

    const handleAlmondClick = () => {

        if (setDrop === false) {
            alert('Dropped! [ ' + canDrop + ' ]');
        }
        else {
            alert('Hello Almond Click! [ ' + open + ' ]' + '[ ' + droppedItem + ' ]');
        }//setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleReset = () => {
        alert('Reset executes here!')
        setOpen(false);
    };

    if (isDropped) {
        border = almondBoarder;
        opacity = 0.7;
    }

    const [{ isDragging }, drag] = useDrag({
        type: 'draggableItem', // Make sure the type is defined
        item: { ...item },
        end: (dropResult, monitor) => {
            // The end function will be called when the drag operation concludes
            if (monitor.didDrop()) {
                // If the item was dropped, show an alert
                alert('Item dropped!');
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const draggedStyle = {
        opacity: isDragging ? 0.5 : 1,
        cursor: dropped ? 'not-allowed' : 'move',
        padding: '8px',
        marginBottom: '8px',
        // backgroundColor: isDragging ? 'black' : 'inherit', // Set background color to black when dragging
        // color: isDragging ? 'white' : 'inherit', // Set text color to white when dragging
        textDecoration: isDragging ? 'line-through' : 'none', // Add strikeout when dragging
    };

    return (
        <>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Reset this pick?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Click Reset to make a new select with this token, cancel to keep the current pick.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleReset} autoFocus>
                    Reset
                </Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
            <EachAlmond onClick={handleAlmondClick}>

                <OuterDot style={{ backgroundColor:curColor}}>
                    <InnerDot
                        style={{
                            border,
                            color,
                            opacity,
                        }}
                    >
                        <div
                            ref={drag}
                            style={draggedStyle}
                            aria-disabled={dropped}
                            >
                            {
                                isDropped == true ?
                                        <i><s>{item.name}</s></i> :
                                    item.name
                            }

                        </div>
                    </InnerDot>
                </OuterDot>
            </EachAlmond>
        </>
    );
};

export default DraggableComponent;



