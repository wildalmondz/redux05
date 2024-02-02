import React, { useState } from 'react';
import Grid from "@mui/material/Grid";
import PicksComments from "./PicksCommentsTopTwo";
import Layout from '../../components/Layout';
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const EventContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    borderTop: '1.5px solid #000',
    padding: '1.5em 0',
});

const StyledItem = styled('div')({
    height: '100%', // Adjust as needed
    border: '1px solid #000', // Example border for visualization
    position: 'relative',
});

const CommentSection = styled('div')({
    backgroundImage: `url('https://images.pconst BackgroundImage = styled('div')({
    backgroundImage: \`url('https://images.pexels.com/photos/1277181/pexels-photo-1277181.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500')\`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
});exels.com/photos/1277181/pexels-photo-1277181.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
});

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

const OverlayText = styled('h3')({
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'black', // Text color
    zIndex: 1, // Ensure text appears above the image
});

const OverlayDescription = styled('div')({
    width: '100%',
    height: '0%',
    paddingTop: '.5em',
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'black', // Text color
    zIndex: 1, // Ensure text appears above the image
});

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    height: '12em',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: '1px solid green', // Example border for visualization
}));

const TopTwo = () => {
    return (
        <Layout>
            {/* Event display section */}
            <EventContainer>
                <Grid container spacing={0}>
                    {/* Scroll text in this window */}
                    <Grid item xs={6}>
                        <StyledItem>
                            <OverlayText>Left Window</OverlayText>
                            <Item><OverlayDescription>
                                Lorem ipsum dolor sit amet, id eos case aeterno ceteros, nam at aperiam tacimates
                                conceptam. Tibique percipit laboramus sed et, cum at legimus inermis suscipiantur.
                                Malorum maiorum consequat an per, vis id oporteat periculis. Quo accumsan placerat
                                scriptorem ad. Pri modus utamur bonorum eu, ad quo nostrum convenire, mea quas fierent
                                principes no. Fabellas philosophia his et, debet mollis te mei. Per rebum laoreet ea,
                                vidit molestie necessitatibus cum ut.

                                Vix at quis deleniti philosophia, quo ex percipit sapientem. Appetere accommodare nec
                                no. Quo verterem deterruisset at, ei denique necessitatibus vix. Etiam dictas officiis
                                pri ad, no vix alia cetero aperiam. Vix zril vocent temporibus ut, qui te similique
                                voluptatibus, no etiam efficiantur nec.

                                Viris invidunt intellegat et sed, eos erroribus assentior ea. Mel quis decore platonem
                                an, dolorum vivendum sed an, quodsi discere efficiantur eam no. Ipsum rationibus mel no.
                                Has verear fuisset ea. Feugiat dissentias ei ius, te albucius omnesque persecuti sea.
                                Pri deleniti laboramus ea, vim id volutpat liberavisse concludaturque.

                                Usu ei ipsum timeam, eos in duis deleniti, per facilis officiis oporteat eu. Ea his
                                clita scriptorem. Nec solum velit persecuti an, sed eu nibh salutatus forensibus. Ne
                                semper nonumes mea, movet fierent convenire quo in, sed ei magna posse oblique. Inani
                                copiosae iracundia no mei, eu vim solet diceret scribentur. Pri te facete adipisci.

                                Tantas inimicus his in, zril solet percipit sea eu. Eum laudem legere forensibus in, qui
                                meliore voluptua quaerendum te. Ea mel elitr propriae salutatus. Velit fastidii ut sed,
                                duo ut ancillae perpetua. Hinc prompta eam ea.
                            </OverlayDescription></Item>
                        </StyledItem>
                    </Grid>
                    {/* Event display right item */}
                    <Grid item xs={6}>
                        <StyledItem>
                            <OverlayText>Right Window</OverlayText>
                            <PicksComments></PicksComments>
                        </StyledItem>
                    </Grid>
                </Grid>
            </EventContainer>
        </Layout>
    )
}

export default TopTwo;