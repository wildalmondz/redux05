import React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Layout from '../../components/Layout';
import { styled } from "@mui/material/styles";
import PicksComments from "./PicksCommentsTopTwo";
import SquareDescription from "./SquareDescription";
import TextField from "@mui/material/TextField";

const squareDescript = '                                        Lorem ipsum dolor sit amet, id eos case aeterno ceteros, nam at aperiam tacimates\n' +
    '                                        conceptam. Tibique percipit laboramus sed et, cum at legimus inermis suscipiantur.\n' +
    '                                        Malorum maiorum consequat an per, vis id oporteat periculis. Quo accumsan placerat\n' +
    '                                        scriptorem ad. Pri modus utamur bonorum eu, ad quo nostrum convenire, mea quas fierent\n' +
    '                                        principes no. Fabellas philosophia his et, debet mollis te mei. Per rebum laoreet ea,\n' +
    '                                        vidit molestie necessitatibus cum ut.\n' +
    '\n' +
    '                                        Vix at quis deleniti philosophia, quo ex percipit sapientem. Appetere accommodare nec\n' +
    '                                        no. Quo verterem deterruisset at, ei denique necessitatibus vix. Etiam dictas officiis\n' +
    '                                        pri ad, no vix alia cetero aperiam. Vix zril vocent temporibus ut, qui te similique\n' +
    '                                        voluptatibus, no etiam efficiantur nec.\n' +
    '\n' +
    '                                        Viris invidunt intellegat et sed, eos erroribus assentior ea. Mel quis decore platonem\n' +
    '                                        an, dolorum vivendum sed an, quodsi discere efficiantur eam no. Ipsum rationibus mel no.\n' +
    '                                        Has verear fuisset ea. Feugiat dissentias ei ius, te albucius omnesque persecuti sea.\n' +
    '                                        Pri deleniti laboramus ea, vim id volutpat liberavisse concludaturque.\n' +
    '\n' +
    '                                        Usu ei ipsum timeam, eos in duis deleniti, per facilis officiis oporteat eu. Ea his\n' +
    '                                        clita scriptorem. Nec solum velit persecuti an, sed eu nibh salutatus forensibus. Ne\n' +
    '                                        semper nonumes mea, movet fierent convenire quo in, sed ei magna posse oblique. Inani\n' +
    '                                        copiosae iracundia no mei, eu vim solet diceret scribentur. Pri te facete adipisci.\n' +
    '\n' +
    '                                        Tantas inimicus his in, zril solet percipit sea eu. Eum laudem legere forensibus in, qui\n' +
    '                                        meliore voluptua quaerendum te. Ea mel elitr propriae salutatus. Velit fastidii ut sed,\n' +
    '                                        duo ut ancillae perpetua. Hinc prompta eam ea.';

const EventContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    borderTop: '1.5px solid #000',
    padding: '1.5em 0',
});

const StyledItem = styled('div')({
    height: '100%',
    border: '1px solid #000',
    position: 'relative',
});

const ScrollableContent = styled('div')({
    height: '100%',
    overflowY: 'auto',
    padding: '0 1em', // Adjust padding as needed
});

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    height: '12em',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: '1px solid green',
}));

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

const TopTwoScrollLeft = () => {
    return (
        <Layout>
            <EventContainer>
                <Grid container spacing={0}>
                    <Grid item xs={6} style={{height: '12em'}}>
                        <StyledItem>
                            <OverlayText>Left Window</OverlayText>
                                    <OverlayDescription>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={4}
                                            value={squareDescript}
                                        />
                                    </OverlayDescription>
                        </StyledItem>
                    </Grid>
                    <Grid item xs={6} style={{height: '12em'}}>
                        <StyledItem>
                            <OverlayText>Right Window</OverlayText>
                            <PicksComments></PicksComments>
                        </StyledItem>
                    </Grid>
                </Grid>
            </EventContainer>
        </Layout>
    );
}

export default TopTwoScrollLeft;

/*
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
 */
