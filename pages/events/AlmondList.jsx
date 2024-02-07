// AlmondList

import React from 'react';
import Almond from './Almond.jsx';
import ItemTypes from './ItemTypes';

// https://medium.com/@rajaraodv/a-guide-for-building-a-react-redux-crud-app-7fe0b8943d0f
// need to import the function to check if the Almond can be drug

let id = null;
let square_id = null;

const AlmondList = ({
						almonds,
						gameId,
						userId,
						lockedStatus,
						expired,
						isDropped,
						handleDrop,
						droppedItem,
						canDeletePick,
						draggingColor,
						setDraggingColor
					}) =>
	(<div id="almond-list">
		{(almonds.length === 0) ?
			<>{' '}</> :
			almonds.map(almond =>
				(<section key={almond.almond_id}>
					<Almond
						item={{
							name: almond.almond_id,
							color: almond.almond_available,
							droppedColor: almond.almond_dropped,
						}}
						isDropped={isDropped}
						gameId={gameId}
						userId={userId}
						lockedStatus={lockedStatus}
						expired={expired}
						tokenColor={almond.almond_available}
						droppedItem={droppedItem}
						handleDrop={handleDrop}
						canDeletePick={canDeletePick}
						setDraggingColor={setDraggingColor}
						{...almond}
						type={ItemTypes.ALMOND}
					/>
				</section>))
		}
	</div>);

export default AlmondList;