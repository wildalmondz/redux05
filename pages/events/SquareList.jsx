import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import DropZoneComponent from "./DropZoneComponent";
import ItemTypes from "./ItemTypes";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
	height: '5em' // Adjust the height as needed
}));

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
						almonds,
						draggingColor
					}) => {
	return (
		<Box sx={{ flexGrow: 1 }} style={{maxHeight: '200px'}}>
			<Grid container spacing={0.5}>
				{(squareDetails.length === 0) ?
					<p>{' '}</p> :
					squareDetails.map(square =>
						<Grid key={square.id} item xs={3} sm={2} md={1.5} lg={1} sx={{ height: '8.75em' }}>
							<DropZoneComponent
								key={square.square_id}  // Assign a unique key to DropZoneComponent
								type={ItemTypes.ALMOND}
								handleDrop={handleDrop}
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
								almonds={almonds}
								draggingColor={draggingColor}
							/>
						</Grid>
					)}
			</Grid>
		</Box>
	);
};

export default SquareList;