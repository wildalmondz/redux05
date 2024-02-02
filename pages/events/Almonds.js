import { useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";
import Layout from '../../components/Layout';
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const almondList =             [
    {
        "almond_id": 1
    },
    {
        "almond_id": 2
    },
    {
        "almond_id": 3
    },
    {
        "almond_id": 4
    }
];

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    height: '12em',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: '1px solid #000', // Example border for visualization
}));

const Almonds = ({ companyDetails, slugListArray, blogListArray, blogContent, urlparse, currentId, likeCount }) => {

    return (
        <Layout>
            <Grid item xs={6}>
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
                }}>Almonds Section</Item>
            </Grid>
        </Layout>
    )
};

export default Almonds;

/*
// DraggableComponent.js
import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableComponent = ({ item }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'draggableItem', ...item },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        border: '1px solid #ccc',
        padding: '8px',
        marginBottom: '8px',
      }}
    >
      {item.name}
    </div>
  );
};

export default DraggableComponent;

 */