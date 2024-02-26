// PicksComments.jsx
import React, { useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";
import Layout from '../../components/Layout';
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import EditorComponent from "./EditorComponent";
import Button from "@mui/material/Button";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	height: '12em',
	padding: theme.spacing(2),
	textAlign: 'center',
	color: theme.palette.text.secondary,
	border: '1px solid #000', // Example border for visualization
	borderRadius: '0px'
}));

const OverlayText = styled('h3')({
	position: 'absolute',
	top: '10%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	color: 'black', // Text color
	zIndex: 1, // Ensure text appears above the image
});

const PicksComments = ({
						   foundComment,
						   userId,
						   gameId,
						   squareId,
						   isSoftSave,
						   setIsSoftSave,
						   hasChanges,
						   setHasChanges,
						   softSquare,
						   setIsSoftSquare,
						   textFieldValue,
						   setTextFieldValue
					   }) => {
	return (
			<Grid item xs={18}>
				<Item sx={{
					color: 'black',
					backgroundImage: 'url(https://wildalmonds.com/api/uploads/725c78bb-ae08-4ed7-93cb-3fb6becd7d04_subtle-dots.png)',
					paddingTop: '0.5em',
					paddingBottom: '0.5em',
					backgroundColor: 'white',
					height: '100%',
					width: '100%',
					position: 'relative',
					display: 'flex',
					justifyContent: 'space-around',
				}}>            {squareId ? (
					<EditorComponent
						foundComment={foundComment}
						userId={userId}
						gameId={gameId}
						squareId={squareId}
						isSoftSave={isSoftSave}
						setIsSoftSave={setIsSoftSave}
						hasChanges={hasChanges}
						setHasChanges={setHasChanges}
						softSquare={softSquare}
						setIsSoftSquare={setIsSoftSquare}
						textFieldValue={textFieldValue}
						setTextFieldValue={setTextFieldValue}
					></EditorComponent>
				) : <div style={{ height: '12em', marginLeft: '70%'}}>
					<OverlayText style={{ height: '12em', marginLeft: '70%'}}>
					</OverlayText>
				</div>}
				</Item>
			</Grid>
	)
};


//<EditorComponent></EditorComponent>
export default PicksComments;