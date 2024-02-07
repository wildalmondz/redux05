import * as React from 'react';
import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '5em' // Adjust the height as needed
}));

export default function HeadsUp({ }) {
    return (
        <Grid item xs={6}>
            <Item sx={{
                color: 'white',
                backgroundImage: 'url(https://wildalmonds.com/api/uploads/725c78bb-ae08-4ed7-93cb-3fb6becd7d04_subtle-dots.png)',
                paddingTop: '0.5em',
                paddingBottom: '0.5em',
                backgroundColor: '#17355B',
                height: '100%',
                width: '100%',
                borderRadius: '0px',
                position: 'relative',
                display: 'flex',
                justifyContent: 'space-between',  // Use space-between to evenly space the items
                alignItems: 'center', // Align items to the center vertically
            }}>
                <span>Item 1:</span>
                <span>Item 2:</span>
                <span>Item 3:</span>
            </Item>
        </Grid>
    );
}