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
        droppedColor}) => {

    const [open, setOpen] = useState(false);
    const [canDrop, setDrop] = useState(true);
    const [resetPick, setResetPick] = useState(false);
    const [curColor, setCurColor] = useState(tokenColor);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {

            console.log(`Dropped: ${isDropped} type is ${typeof isDropped}`)


            if ((isDropped != null) && (canDrop != false) && (resetPick != true)) {
                alert('reset Pick? ' + resetPick + 'item: ' + item.name + ' is dropped: ' + isDropped)
                // set the colors to dropped colors

                setDrop(false);
                setCurColor(droppedColor);
            }

            else if ((resetPick === true) && (canDrop === false)) {
                setResetPick(false);
                setDrop(true);
            }

            if (isDropped != null) {
                setDrop(false); // has been dropped can't drop again
            }

            /*
            if ((droppedItem === true) || (canDrop != true)) {
                setDrop(false);
                //console.log('item: ' + item.name + ' Is not dropped ' + isDropped);
            }
            else if (((droppedItem === false) || (droppedItem === null)) && setDrop != true){
                setDrop(true);
            }

             */

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

    // first time through the function

    /*
    if ((isDropped != null) && (canDrop != false) && (droppedToken === null)) {
        console.log('item: ' + item.name + ' is dropped: ' + isDropped)
        // set the colors to dropped colors

        setDrop(false);
        setCurColor(droppedColor);
        setDroppedToken(isDropped);
    }
     */


    else if ((resetPick === true) && (canDrop === false)) {
        alert('Deleted pick can be dropped')
        setDrop(true);
        // setCurColor(tokenColor);
        // setDroppedToken(null);
        setResetPick(false);
    }



    if (!item) { return null; }

    /*
    if ((droppedItem === false) && (canDrop != true)) {
        setDrop(true);
        //console.log('item: ' + item.name + ' Is not dropped ' + isDropped);
    };

     */

    /*
    const canDeletePick = async ( ) => {
        alert(`Delete Pick:
                    gameId ${gameId}  
                    userId ${userId} 
                    almond ${almond} 
                    expired: ${expired} 
                    locked: ${lockedStatus}
                    canDrop: ${canDrop}
                    isDropped: ${isDropped}  
                    droppedItem: ${droppedItem}
                    droppedToken: ${droppedToken}
                    curColor: ${curColor}     
                    resetPick: ${resetPick}           
                `);

        console.log(`\n\n\n\n Expired!  ${expired} \n\n\n\n`);
        if ((isExpired !== 'expired') && (lockedStatus === 'unlocked')) {

            try {
                const res = await axios({
                    method: 'post',
                    // withCredentials: true,
                    url: `http://localhost:4500/pick/deletepick/${gameId}/${userId}/${almond}`,
                });
                if (res) {

                    // setCurColor(tokenColor); //working ok
                    setDroppedToken(null);
                    // setDroppedItem(false);
                    setResetPick(true);
                    console.log(JSON.stringify(res));  // Assuming the data you need is in res.data


                    setTimeout(() => {
                        router.push(`/events/invitedgame/${gameId}/${userId}/${email}`)
                    }, 250);

                }

            } catch (err) {
                console.error(err);
            }
        }

        return true;
        }

     */

    const handleAlmondClick = () => {

        alert(`Almond Click:
                item: ${JSON.stringify(item)}  // to be sent back to EventHeader
                gameId ${gameId}  
                userId ${userId} 
                almond ${almond} 
                expired: ${expired} 
                locked: ${lockedStatus}
                canDrop: ${canDrop}
                isDropped: ${isDropped}  
                droppedItem: ${JSON.stringify(droppedItem)}
                curColor: ${curColor}    
                resetPick: ${resetPick}               
                `);

        if (canDrop === false) {
            setOpen(true);
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
                // If the item was dropped, show an alert
                // router.post('/setpick_v3/:pickId/:gameId/:userId/:almondId/:squareId'

                // alert('Item dropped!');
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



