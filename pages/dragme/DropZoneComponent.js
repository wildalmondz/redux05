// dragtest/DropZoneComponent.js
import React from 'react';
import { useDrop } from 'react-dnd';
import {styled} from "@mui/material/styles";
import axios from "axios";
// import ItemTypes from './ItemTypes'

// Invitation
// http://localhost:3000/events/invitation/5ce32b4b-198b-4c5c-ae9e-98a76d319d5c/6a18296e-afd0-4d0b-846d-86ce54671892/sample06@wildalmondstest.com

// InvitedGame
// http://localhost:3000/events/invitedgame/5ce32b4b-198b-4c5c-ae9e-98a76d319d5c/1ccb9963-00fe-4fb8-85b7-5633f4aa8c0e/sample06@wildalmondstest.com

const ItemTypes = {
    DRAGGABLE_ITEM: 'draggableItem',
};

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

const DropZoneComponent = ({ onDrop, droppedItem, squareName, game_id, userId, image, squareStatus, lastDroppedItem, division, rank, squareId, activeSquares, squareCount}) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.DRAGGABLE_ITEM,
        drop: (item) => {
            onDrop(item);
        },
        canDrop: () => !droppedItem, // Allow drop only if no item has been dropped yet
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    let color = 'black';
    let backgroundColor = 'lightgrey';
    let border = '1px hidden black';
    let backgroundImage = 'url(https://wildalmonds.com/api/uploads/f9cb4ed1-aaba-49bf-96fc-77a365714851_brilliant.png)';


    let almondDisplay;

    //     if ((squareStatus === 'inactive') && (this.props.lastDroppedItem)) {
    //                <p id="squareout"><strong>inactive <del>[{JSON.stringify(this.props.lastDroppedItem)}]</del></strong></p>

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

    else if ((lastDroppedItem) && (lastDroppedItem === 1)) {
        almondDisplay =
            (
                <p id="toppick"><strong>Top [ 1 ]</strong></p>
            );
    } else if ((squareStatus === 'active') && (lastDroppedItem))  {
        almondDisplay = <p id="squaredrop"><strong>[ {JSON.stringify(lastDroppedItem)} ]</strong></p>;
    }
    else {
        almondDisplay = <p />;
    }

    //     const canDeletePick = async ( game_id, userId, isExpired, almond, locked ) => {

    const handleSquareClick = async () => {
        alert('Hello Square Click!');
        if (division === 'Squares') {
            setTimeout(() => {
                // alert(`${userId}, ${gameId}, ${gameName}, ${email}, ${child_id}, ${squareId}`)
                alert('Here!');
                // findSquareDetail(userId, gameId, gameName, email, child_id, squareId);
            }, 250);
        }
        else {
                /*
                  return fetch(`${apiPath}/invited/squarepath/${gameId}/${rank}/${division}/${squareId}/${activeSquares}/${sqCount}`, {
                    method: 'get',
                    credentials: 'include',
                 */
                try {
                    const res = await axios({
                        method: 'get',
                        credentials: 'include',
                        // url: `http://localhost:4500/invited/squarepath/${game_id}/${rank}/${division}/${squareId}/${activeSquares}/${squareCount}`,
                        url: `http://localhost:4500/invited/squaredetail/${userId}/${game_id}/${squareId}`
                    });

                    if (res) {
                        // setDrop(true);
                        console.log('response ' + JSON.stringify(res));
                    }
                } catch (err) {
                    console.error(err);
                }
        }
    };

    const containerStyle = {
        border: '2px solid #aaa',
        // padding: '16px',
        height: '130px',
        backgroundColor: isOver && canDrop ? '#92ad44'
            : droppedItem ? droppedItem.color
            : 'white',
        // pointerEvents: canDrop ? 'auto' : 'none', // Disable pointer events if an item is already dropped
    };

    return (
        <SquareArea>
        <div onClick={handleSquareClick} ref={drop} style={containerStyle}>
            {droppedItem ? (
                <div style={{backgroundColor: droppedItem.color}}>
                    Dropped Item: {droppedItem.name}
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