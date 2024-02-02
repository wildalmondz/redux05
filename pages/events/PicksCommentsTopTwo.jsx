// PicksComments.jsx
import { useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import EditorComponent from "./EditorComponent";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	textAlign: 'center',
	color: theme.palette.text.secondary,
	border: '1px solid #000', // Example border for visualization
}));

const PicksComments = ({  }) => {

	return (
			<Grid item xs={16}>
				<Item><EditorComponent></EditorComponent></Item>
			</Grid>
	)
};


//<EditorComponent></EditorComponent>
export default PicksComments;