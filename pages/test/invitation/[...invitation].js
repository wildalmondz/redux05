// pages/events[...events].js
import * as React from 'react';
import { useEffect, useState } from 'react';
import { eventsHandler } from "../../../pages/api";
import {useRouter} from "next/router";
import {styled} from "@mui/material/styles";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ContainerNoDivision from "../squarelayout/containerNoDivision";
import Paper from "@mui/material/Paper";
import Clock from "./Clock"

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '5em' // Adjust the height as needed
}));

const ContainerInvitation = styled('section')({
    width: 'auto',
    margin: '2px',
    textAlign: 'center',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
    display: 'grid',
    justifyContent: 'center',
    border: '2px solid gainsboro',
    overflow: 'auto',
    backgroundColor: 'ghostwhite',
    minHeight: '35em',
    '& h1': {
        textAlign: 'center',
        padding: '.5em',
        flexBasis: 'calc(100% - 1em)',
    },
})


let userId;
let gameId;
let structuredUrl;

const EventsArea = styled('section')({
});

export default function Invitation({ foundUserId, gameId, gameName, gameDesc, invitedFrom, userId, email }) {
    const [parametersDefined, setParametersDefined] = useState(false);
    const [curGameName, setGameName] = useState('');
    const [curGameDesc, setGameDesc] = useState('');
    const [curGameId, setGameId] = useState('');
    const [curInvitedFrom, setInvitedFrom] = useState('');
    const [curUserId, setUserId] = useState(null);
    const [curEmail, setEmail] = useState(null);

    const router = useRouter();

    useEffect(() => {
        if (foundUserId != undefined) {
            // console.log('\n\n\n  ALERT UserId set!!!! \n\n\n' + foundUserId);
            setUserId(foundUserId);
            // setParametersDefined(true);
        }
    }, [foundUserId]);

    useEffect(() => {
        if (gameName != '') {
            setGameName(gameName);
            // setParametersDefined(true);
        }
        if (gameDesc != '') {
            setGameDesc(gameDesc);
            // setParametersDefined(true);
        }
        if (gameId != '') {
            setGameId(gameId);
            // setParametersDefined(true);
        }
        if (invitedFrom != '') {
            setInvitedFrom(invitedFrom);
            // setParametersDefined(true);
        }
        if (userId != '') {
            setUserId(userId);
            // setParametersDefined(true);
        }
        if (email != '') {
            setEmail(email);
            setParametersDefined(true);
        }
    }, [gameName, gameDesc, gameId, invitedFrom, userId, email]);

    return (
        <EventsArea>
            {parametersDefined && (
                <ContainerInvitation>
                    <Item>
                        <Clock />

                        <h3>Welcome to WildAlmonds!!</h3>
                        <ul>
                            <li>You have been selected to participate in the event listed in the card below</li>
                            <li>Please accept this invitation and lock your picks!</li>
                        </ul>
                    </Item>
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                pt: 8,
                                pb: 6,
                            }}
                        >
                            <section className="invite-card">
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="div" id="invite-title">
                                            Invitation Card
                                        </Typography>
                                        <strong>To:</strong>{curEmail}
                                        <br />
                                        <br />
                                                    <strong>From:</strong>{curInvitedFrom}
                                        <br />
                                                    <strong>Event:</strong>{curGameName}
                                        <br />
                                                    <strong>Description:</strong>{curGameDesc}
                                        <br />
                                                    <strong>Game Id:</strong>{curGameId}
                                        <br />
                                                    <strong>User Id:</strong>{curUserId}
                                    </CardContent>
                                </Card>
                            </section>
                        <div id="accept">
                            <Button variant="contained" onClick={() => { router.push(`/events/invitedgame/${curGameId}/${curUserId}/${email}`);
                            }}>Accept</Button>
                        </div>
                        </Box>
                        <div id="terms">
                            <p>
                                <br />
                                By accepting, you are at least age 21, agree to receive email from the event host,  and
                                to use of the site as explained in our{' '}
                                <a style={{ color: 'blue', textDecoration: 'underline' }} href="/about/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>{' '}
                                and{' '}<a style={{ color: 'blue', textDecoration: 'underline' }} href="/about/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                                {/*<a href="https://wildalmonds.com/about/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> */}
                            </p>
                        </div>

                </ContainerInvitation>
            )}
        </EventsArea>

    );
}

export async function getStaticProps({ params }) {
    let results;
    let foundInviteId = '';
    let gameDesc = '';
    let gameName = '';
    let invitedFrom = '';
    let email = '';

    const { invitation } = params;

    structuredUrl = {
        gameId: invitation[0] || '',
        inviteId: invitation[1] || undefined,
        email: invitation[2] || undefined,
    };

    if (structuredUrl.invite === 'invitation') { console.log('Run the invitation code'); }

    if (structuredUrl.inviteId) {
        foundInviteId = structuredUrl.inviteId
        console.log('\n\n\n foundUserId!!!' + foundInviteId + '\n\n\n');
    };

    if (structuredUrl.gameId) {
        gameId = structuredUrl.gameId
        console.log('\n\n\n gameId!!!' + gameId + '\n\n\n');
    };

    if (structuredUrl.email) {
        email = structuredUrl.email
        console.log('\n\n\n email!!!' + email + '\n\n\n');
    };
    console.log('structuredURL: [ ' + JSON.stringify(structuredUrl) + ' ]');


    if (!structuredUrl.inviteId) {
        console.log('No userId');
        return {
            notFound: true,
        };
    }
    if (!structuredUrl.email) {
        console.log('No email');
        return {
            notFound: true,
        };
    }

    try {
        console.log(`http://localhost:3000/invitation/${gameId}/${foundInviteId}/${email}`);
        results = await eventsHandler(`http://localhost:4500/navigate/getemailid/${structuredUrl.gameId}/${structuredUrl.email}`);

        // results = await eventsHandler(`http://localhost:3000/invitation/${gameId}/3c38974a-8328-4a3b-b7aa-103af9e916fb/sample06@wildalmondstest.com}`);
        // results = await eventsHandler(`http://localhost:4500/games/gamemaster/${structuredUrl.gameId}/${structuredUrl.userId}/${structuredUrl.email}`);
        // axios.get(`http://localhost:4500/games/gamemaster/${structuredUrl.gameId}/${structuredUrl.userId}/${structuredUrl.email}`)
        //   .then((response) => {
        /*
        return fetch(`${apiPath}/navigation/getemailid/${gameId}/${email}`, {
            method: 'get',
            credentials: 'include',
        })

         */

        console.log('\n\nstart 5. RESULTS?\n\n');
        if (results) {
            console.log(JSON.stringify(results));
            console.log('\n\nend\n\n');

            const inviteDetails = results;

            gameName = inviteDetails.results.find(result => result.game_name)?.game_name;
            gameId = inviteDetails.results.find(result => result.game_id)?.game_id;
            gameDesc = inviteDetails.results.find(result => result.game_description)?.game_description;
            invitedFrom = inviteDetails.results.find(result => result.email)?.email;
            userId = inviteDetails.results.find(result => result.invite_id)?.invite_id;
            email = structuredUrl.email;

        }
        /*
        const gameDetails = results;
        almonds = gameDetails.results.find(result => result.almondDetails)?.almondDetails || [];
        squares = gameDetails.results.find(result => result.squareDetails)?.squareDetails || [];

        const squareIds = squares.map(square => square.square_id);
        const squareComments = squares.map(square => square.userComment);

        // console.log("\n\nSquares in Events:\n" + typeof(squares) + JSON.stringify(squares));
        console.log('Square Ids: [ ' + squareIds + ' ]');
        console.log('Square Comments: [ ' + squareComments + ' ]');

         */

    } catch (error) {
        console.error('Error fetching invitation data:', error.message);
    }

    return {
        props: {
            gameName,
            gameId,
            gameDesc,
            invitedFrom,
            userId,
            email
        },
    };
}

export async function getStaticPaths() {
    const categoriesData = [];
    const categories = categoriesData.map((category) => category.slug);

    const paths = categories.map((category) => ({
        params: { events: [category] },
    }));

    return {
        paths,
        fallback: false,
    };
}