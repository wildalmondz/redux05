import React, { useState } from 'react';
import Almond from './Almond.jsx';

const ItemTypes = {
	ALMOND: 'almond',
	ROUND: 'round',
};

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
						setDraggingColor,
						curLocked
					}) => {

	const [foundAlmond, setFoundAlmond] = useState('');
	const [almondSet, setAlmondSet] = useState('');


	if ((almonds) && almondSet === 0) {
		setFoundAlmond(almonds)
		setAlmondSet(1)
	}


	return (
		<div id="almond-list">
			{(foundAlmond.length === 0) ?
				<>{' '}</> :
				foundAlmond.map(almond =>
					(<section key={foundAlmond.almond_id}>
						<Almond
							item={{
								name: foundAlmond.almond_id,
								color: foundAlmond.almond_available,
								droppedColor: foundAlmond.almond_dropped,
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
							curLocked={curLocked}
							{...almond}
							type={ItemTypes.ALMOND}
						/>
					</section>))
			}
		</div>
	);
};

export default AlmondList;
