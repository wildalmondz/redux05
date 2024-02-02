import React from 'react';
import Grid from "@mui/material/Grid";
import PicksComments from "./PicksComments";
import Layout from '../../components/Layout';
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const EventContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    borderTop: '1.5px solid #000',
    padding: '1.5em 0',
});

const StyledItem = styled('div')({
    display: 'flex',
    flexDirection: 'column',  // Set to column to align items vertically
    justifyContent: 'space-between',
    height: '100%',
    border: '1px solid #000',
    position: 'relative',
});

const CommentSection = styled('div')({
    backgroundImage: `url('https://images.pexels.com/photos/1277181/pexels-photo-1277181.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
});

const OverlayText = styled('h3')({
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'black',
    zIndex: 1,
});

const OverlayDescription = styled('div')({
    width: '100%',
    height: '0%',
    paddingTop: '.5em',
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'black',
    zIndex: 1,
});

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    height: '100%', // Change to 100% to fill the container
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: '1px solid green',
    display: 'flex',
    flexDirection: 'column',  // Set to column to align items vertically
    justifyContent: 'space-between',
}));

const BackgroundImage = styled('div')({
    backgroundImage: `url('https://images.pexels.com/photos/1277181/pexels-photo-1277181.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
});

const TopTwo = () => {
    return (
        <Layout>
            <EventContainer>
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <StyledItem>
                            <BackgroundImage/>
                            <OverlayText>Left Window</OverlayText>
                            <Item>
                                <OverlayDescription>Square Description</OverlayDescription>
                            </Item>
                        </StyledItem>
                    </Grid>
                    <Grid item xs={6}>
                        <CommentSection>
                            <PicksComments></PicksComments>
                        </CommentSection>
                    </Grid>
                </Grid>
            </EventContainer>
        </Layout>
    );
};

export default TopTwo;
