// dragtest/DropZoneComponent.js
import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import {styled, useTheme} from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';

import axios from "axios";

const ItemTypes = {
    DRAGGABLE_ITEM: 'draggableItem',
};
let border = '2px solid #aaa';
let droppedColor = 'white';

const SquareArea = styled('div')({
    height: '8.5rem',
    width: '5.5rem',
    marginRight: '.75rem',
    marginBottom: '.5rem',
    paddingTop: '5px',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: '1.25rem',
    float: 'left',
    cursor: 'pointer',
    borderRadius: '5px',
})

const DropZoneComponent = ({
                               handleDrop,
                               handleClick,
                               droppedItem,
                               squareName,
                               gameId,
                               userId,
                               image,
                               squareStatus,
                               lastDroppedItem,
                               division,
                               squareId,
                               userComment,
                               almonds,
                               draggingColor,
                               hasChanges,
                               setIsSoftSave,
                               squareComment,
                               setSquareComment,
                               textFieldValue
                            }) => {

    const theme = useTheme();
    const isWindowSmallerThan400px = useMediaQuery(theme.breakpoints.down('sm'));

    const [changeDetected, setChangeDetected] = useState(false);

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.DRAGGABLE_ITEM,
        drop: (item, monitor) => {
            item.squareId = squareId;
            handleDrop(item);
            console.log('\n\n\n Here at drop ' + JSON.stringify(item)); // Set the item in the state when it's dropped
        },
        canDrop: () => !lastDroppedItem, // Allow drop only if no item has been dropped yet
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const containerStyle = {
        border: border,
        height: '130px',
        backgroundColor: isOver && canDrop ? draggingColor
            : lastDroppedItem ? droppedColor
                : 'lightgrey',
    };

    function getAlmondById(almonds, lastDroppedItem) {
        return almonds.find(almond => almond.almond_id === lastDroppedItem);
    }

    if ((hasChanges === true) && (changeDetected === false)) {
        // console.log('Change found?: DropZoneComponent => hasChanges' + hasChanges + ' isSoftSave ' + isSoftSave +  ' <=! ');
        setChangeDetected(true);
    }

    let color = 'black';
    let backgroundColor = 'lightgrey';
    border = '1px hidden black';
    let backgroundImage = 'url(https://wildalmonds.com/api/uploads/f9cb4ed1-aaba-49bf-96fc-77a365714851_brilliant.png)';

    let almondDisplay;

    if ((squareStatus === 'inactive') && (lastDroppedItem)) {
        almondDisplay =
            (
                <p id="squareout"><strong>inactive <del>[{JSON.stringify(lastDroppedItem)}]</del></strong></p>
            );
        backgroundColor = 'black';
        color = 'white';
    }
    else if (squareStatus === 'inactive')  {
        almondDisplay =
            (
                <p id="squareout"><strong>inactive</strong></p>
            );
        backgroundColor = 'black';
        color = 'white';
    }
    else if (userComment) {
        border = '3px groove green';
    }

    if ((isOver) && (lastDroppedItem === null) && (squareStatus !== 'inactive'))  {
        console.log(JSON.stringify(squareId));
        border = '7px groove red';
    }

    if ((lastDroppedItem) && (lastDroppedItem != null))  {
        const currentAlmond = getAlmondById(almonds, lastDroppedItem);

        if (lastDroppedItem === 1) {
            droppedColor = currentAlmond.almond_available;
            almondDisplay = (<p id="toppick"><strong>Top [ 1 ]</strong></p> );
        }
        else {
            droppedColor = currentAlmond.almond_available;
            almondDisplay = (
                <p id="toppick"><strong>{lastDroppedItem}</strong></p>
            );
        }
    }
    else {
        almondDisplay = <p />;
    }

    const handleSquareClick = async () => {

        if (hasChanges === true) {
            setIsSoftSave(true);
            // alert('Change found?: DropZoneComponent => hasChanges' + hasChanges + ' isSoftSave ' + isSoftSave + ' textFieldValue ' + textFieldValue + ' <=! ');
            setSquareComment(textFieldValue)
        }
        if (division === 'Squares') {
            setTimeout(() => {
                // alert('Here!');
            }, 250);
        } else {
           // alert('lastDroppedItem: ' + lastDroppedItem + 'typeOf: ' + typeof(lastDroppedItem) + ' squareStatus: [ ' + squareStatus + ' ]' + 'canDrop: [ ' + canDrop + ' ]');
            try {
                const res = await axios({
                    method: 'get',
                    credentials: 'include',
                    url: `http://localhost:4500/invited/squaredetail_v02/${userId}/${gameId}/${squareId}`
                });

                if (res) {
                    alert('response ' + res.data[0][0].userComment + 'comment ' + squareComment );
                    setSquareComment(res.data[0][0].userComment);
                    // setSquareComment('Bob');

                }
            } catch (err) {
                console.error(err);
            }
        }
        handleClick(squareId);
    };

    return (
        <SquareArea
            sx={{
                height: isWindowSmallerThan400px ? '6rem' : '8.5rem',
                width: isWindowSmallerThan400px ? '4rem' : '5.5rem',
            }}
        >

        <div onClick={handleSquareClick} ref={drop} style={containerStyle}>
            {droppedItem ? (
                <div id="squareName"
                     style={{
                         width: '75px',
                         height: '2.7em',
                         overflow: 'hidden',
                         fontSize: '12px',
                         lineHeight: 'initial',
                         fontWeight: '500',
                     }}>
                    {squareName}
                </div>
            ) : (
                <div id="squareName"
                     style={{
                         width: '75px',
                         height: '2.7em',
                         overflow: 'hidden',
                         fontSize: '11px',
                         lineHeight: 'initial',
                         fontWeight: '500',
                     }}>
                    {squareName}
                </div>

            )}
            {image && (
                <img src={image} width="70" height="70" />
            )}
            {almondDisplay}
        </div>
        </SquareArea>
    );
};

export default DropZoneComponent;