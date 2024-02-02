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
	game_id,
	userId,
	isDropped,
	isExpired,
	locked,
}) =>
	(<div id="almond-list">
		{(almonds.length === 0) ?
			<p>{' '}</p> :
			almonds.map(almond =>
				(<section key={almond.almond_id}>
					<Almond
						item={{
							name: almond.almond_id,
							color: almond.almond_available,
							droppedColor: almond.almond_dropped,
						}}
						isDropped={isDropped}
						game_id={game_id}
						userId={userId}
						isExpired={isExpired}
						locked={locked}
						tokenColor={almond.almond_available}

						{...almond}
						type={ItemTypes.ALMOND}
					/>
				</section>))
		}
	</div>);

export default AlmondList;