// AlmondList

import React from 'react';
import ItemTypes from './ItemTypes';
import DropZoneComponent from "./DropZoneComponent";
import {styled} from "@mui/material/styles";

// https://medium.com/@rajaraodv/a-guide-for-building-a-react-redux-crud-app-7fe0b8943d0f
// need to import the function to check if the Almond can be drug

const SquareList = ({
						handleDrop,
						handleClick,
						droppedItem,
						squareDetails,
						game_id,
						game_name,
						userId,
						email,
						division,
						activeSquares,
						squareCount,
					}) =>
	(<div id="squares-list">
		{(squareDetails.length === 0) ?
			<p>{' '}</p> :
			squareDetails.map(square =>
				(<section key={square.square_id}>
						<DropZoneComponent
							type={ItemTypes.ALMOND}
							onDrop={handleDrop}
							handleClick={handleClick}
							droppedItem={droppedItem}
							squareName={square.square_name}
							game_id={game_id}
							userId={userId}
							image={square.image_path}
							squareStatus={square.square_status}
							lastDroppedItem={square.lastDroppedItem}
							division={division}
							rank={square.square_rank}
							squareId={square.square_id}
							activeSquares={activeSquares}
							squareCount={squareCount}
							userComment={square.userComment}
						/>
				</section>))
		}
	</div>);

export default SquareList;