// dragtest/Almond.jsx
import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {useRouter} from "next/router";
import fixDate from "../../src/lib/fixDate";

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

const Almond = ({
        item,
        gameId,
        userId,
        email,
        isDropped,
        handleDrop,
        canDeletePick,
        lockedStatus,
        expired,
        isExpired,
        tokenColor,
        droppedItem,
        droppedColor,
        curLocked}) => {

    const [open, setOpen] = useState(false);
    const [canDrop, setDrop] = useState(true);
    const [resetPick, setResetPick] = useState(false);
    const [curColor, setCurColor] = useState(tokenColor);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {

            if ((isDropped != null) && (canDrop != false) && (resetPick != true)) {
                // alert('reset Pick? ' + resetPick + 'item: ' + item.name + ' is dropped: ' + isDropped)
                // set the colors to dropped colors

                setDrop(false);
                setCurColor(droppedColor);
            }
            else if ((resetPick === true) && (canDrop === false)) {
                setResetPick(false);
                setDrop(true);
            }

            if ((isDropped != null) || (curLocked != 'unlocked')) {
                setDrop(false); // has been dropped or is locked and can't drop again
            }

            if (curLocked != 'unlocked') {
                setDrop(false); // has been dropped or is locked and can't drop again
            }
        };

        // Call the async function immediately
        fetchData();
    }, [isDropped, droppedItem]);


    // const isActive = isOver && canDrop;
    const almondBoarder = `1px solid`;
    // let backgroundColor = '#edebeb';
    let border = 'black';
    let color = '#705856';
    let opacity = 1;
    let almond;


    if (item.name) {
        almond = item.name;
    }

    if (!item) { return null; }

    const handleAlmondClick = () => {
        alert(`Almond Click:   
                curLocked: ${curLocked}           
                `);

        if ((canDrop === false) && (curLocked != 'Locked')){
            setOpen(true);
        }
        else if (curLocked === 'Locked') {
            alert(`Event is ${curLocked}`);
        }
        else {
            console.log('Can drop? [ ' + canDrop + ' ]');
            setOpen(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleReset = () => {
        canDeletePick(item)
        setResetPick(true);
        setDrop(true);
        setOpen(false);
        setCurColor(item.color)
    };

    if (isDropped) {
        border = almondBoarder;
        opacity = 0.7;
    }

    const [{ isDragging }, drag] = useDrag({
        type: 'draggableItem', // Make sure the type is defined
        item: { ...item },
        canDrag: canDrop,
        end: (dropResult, monitor) => {
            // The end function will be called when the drag operation concludes

            if (monitor.didDrop()) {
                setCurColor(droppedColor);
            }

        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });


    const draggedStyle = {
        opacity: isDragging ? 0.5 : 1,
        cursor: isDropped ? 'not-allowed' : 'move',
        padding: '2px',
        marginBottom: '2px',
        backgroundColor: isDragging ? 'black' : 'inherit', // Set background color to black when dragging
        color: isDragging ? 'white' : 'inherit', // Set text color to white when dragging
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
                    Choose RESET to make a new select with this token or CANCEL to keep the current pick.
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
                            aria-disabled={canDrop}
                            >
                            {
                                canDrop != true ?
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

export default Almond;



