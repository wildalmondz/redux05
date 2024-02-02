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
						squares,
						game_id,
						game_name,
						userId,
						email,
						division,
						activeSquares,
						squareCount,
					}) => {
	// const items = Array.from({ length: 16 }, (_, index) => index + 1);
	//                 {items.map((item) => (

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={0.5}>
				{(squares.squareDetails.length === 0) ?
					<p>{' '}</p> :
					squares.squareDetails.map(square =>
						<Grid key={square} item xs={3} sm={2} md={1.5} lg={1} sx={{ height: '8.75em' }}>
							<DropZoneComponent
								type={ItemTypes.ALMOND}
								squareName={square.square_name}
								game_id={'5ce32b4b-198b-4c5c-ae9e-98a76d319d5c'}
								userId={'1ccb9963-00fe-4fb8-85b7-5633f4aa8c0e'}
								image={square.image_path}
								squareStatus={square.square_status}
								lastDroppedItem={square.lastDroppedItem}
								rank={square.square_rank}
								squareId={square.square_id}
								userComment={square.userComment}
							/>
						</Grid>
					)}
			</Grid>
		</Box>
	);
};

export default SquareList;
