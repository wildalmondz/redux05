// dragtest/Almond.jsx
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { styled } from '@mui/material/styles';
import axios from 'axios';
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


const Almond = ({ item, isDropped, dropped, isExpired, locked, tokenColor, droppedColor }) => {
    const [open, setOpen] = useState(false);
    const [droppedItem, setDroppedItem] = useState(false);
    const [canDrop, setDrop] = useState(true);
    const [curColor, setCurColor] = useState(tokenColor);

    // const isActive = isOver && canDrop;
    const almondBoarder = `1px solid`;
    // let backgroundColor = '#edebeb';
    let border = 'black';
    let color = '#705856';
    let opacity = 1;

    if ((isDropped != null) && (canDrop != false)) {
        console.log('item: ' + item.name + ' is dropped: ' + isDropped)
        // set the colors to dropped colors

        setDrop(false);
        setCurColor(droppedColor);
    }

    if (!item) { return null; }
    if (dropped == true) { setDroppedItem(dropped) };

    if ((isDropped === null) && (canDrop != false)) {
        console.log('item: ' + item.name + ' Is not dropped ' + isDropped);
    };

    /*
        const login = async () => {
        try {
            const res = await axios({
                method: 'get',
                withCredentials: true,
                url: 'http://localhost:4500/user',
            });

            if (res.data.user_id !== undefined && /^20000/.test(res.data)) {
                setLoggedIn(true);
                setUserName(res.data.username); // Update with actual username property
            } else {
                console.log('No user found');
            }
        } catch (err) {
            console.error(err);
        }
    };
     */

    const canDeletePick = async ( game_id, userId, isExpired, almond, locked ) => {
        console.log(`\n\n\n\n Locked!  ${locked} \n\n\n\n`);
        if ((isExpired !== 'expired') && (locked === null)) {

            try {
                const res = await axios({
                    method: 'post',
                    // withCredentials: true,
                    url: `http://localhost:4500/pick/deletepick/${game_id}/${userId}/${almond}`,
                });

                if (res) {
                    setDrop(true);
                    console.log('response ' + JSON.stringify(res));
                }
            } catch (err) {
                console.error(err);
            }

        }

        return true;
        }

    const handleAlmondClick = () => {

        if (canDrop === false) {
            // alert('Can drop? [ ' + canDrop + ' ]');
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
        canDeletePick('2524626a-90c8-4ff7-9129-07b0606ca884', 'a53ea279-5f19-402d-a1b5-2b82bd636a02', null, 4, null)
        setOpen(false);
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
                            aria-disabled={dropped}
                            >
                            {
                                isDropped != null ?
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



