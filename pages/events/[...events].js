// pages/events[...events].js
import { useEffect, useState } from 'react';
// import axios from 'axios';
import { eventsHandler } from "../../pages/api";
import EventHeader from "./EventHeader";
import {styled} from "@mui/material/styles";

let userId;
let gameId;
let structuredUrl;

const EventsArea = styled('section')({
});

export default function Events({ almonds, squares, foundUserId, gameId, email, locked, expired }) {
    const [parametersDefined, setParametersDefined] = useState(false);
    const [almondList, setAlmondList] = useState(null);
    const [squaresList, setSquaresList] = useState(null);
    const [lockedStatus, setLockedStatus] = useState(null);
    const [curGameId, setGameId] = useState(null);
    const [curUserId, setUserId] = useState(null);

    // const router = useRouter();

    useEffect(() => {
        if ((almonds != null) || (almonds != undefined)) {
            setAlmondList(almonds);
        }
        if ((squares != null) || (squares != undefined)) {
            setSquaresList(squares);
        }
        if ((locked != null) || (locked != undefined)) {
            setLockedStatus(locked);
        }
    }, [almonds, squares, locked]);

    /*  remove if all testing goes well
    useEffect(() => {
        if ((almonds != null) || (almonds != undefined)) {
            // console.log('\n\n\n  ALERT Almonds set!!!! \n\n\n' + JSON.stringify(almondList));
        }
    }, [almondList]);

    useEffect(() => {
        if ((squares != null) || (squares != undefined)) {
            // console.log('\n\n\n  ALERT Squares set!!!! \n\n\n' + JSON.stringify(squaresList));

        }
    }, [squaresList]);

     */

    useEffect(() => {
        if (foundUserId != undefined) {
            console.log('\n\n\n  ALERT UserId set!!!! \n\n\n' + foundUserId);
            setUserId(foundUserId);
            setParametersDefined(true);
        }
    }, [foundUserId]);

    return (
        <EventsArea>
            {parametersDefined && (
                <>
                    <EventHeader
                        almonds={almondList}
                        squares={squaresList}
                        foundUserId={foundUserId}
                        gameId={gameId}
                        email={email}
                        lockedStatus={lockedStatus}
                        expired={expired}
                    />
                </>
            )}
        </EventsArea>
    );
}

export async function getStaticProps({ params }) {
    let results;
    let almonds = [];
    let squares = [];
    let expired = '';
    let locked = '';
    let email = '';
    let foundUserId = '';

    const { events } = params;

    structuredUrl = {
        invite: events[0] || '',
        gameId: events[1] || '',
        userId: events[2] || undefined,
        email: events[3] || undefined,
    };

    if (structuredUrl.invite === 'invitation') {
        console.log('Run the invitation code');
    }

    if (structuredUrl.userId) {
        foundUserId = structuredUrl.userId
        console.log('\n\n\n foundUserId!!!' + foundUserId);
    };

    if (structuredUrl.gameId) {
        gameId = structuredUrl.gameId
        console.log('gameId!!!' + gameId);
    };

    if (structuredUrl.email) {
        email = structuredUrl.email
        console.log('email!!!' + email + '\n\n\n');
    };

    console.log('structuredURL: [ ' + JSON.stringify(structuredUrl) + ' ]');


    if (!structuredUrl.userId) {
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
        results = await eventsHandler(`http://localhost:4500/games/gamemaster/${structuredUrl.gameId}/${structuredUrl.userId}/${structuredUrl.email}`);
        // axios.get(`http://localhost:4500/games/gamemaster/${structuredUrl.gameId}/${structuredUrl.userId}/${structuredUrl.email}`)
         //   .then((response) => {



        const gameDetails = results;
        almonds = gameDetails.results.find(result => result.almondDetails)?.almondDetails || [];
        squares = gameDetails.results.find(result => result.squareDetails)?.squareDetails || [];
        // locked = gameDetails.results.find(result => result.locked)?.userlocked || null;
        // const lockedElement = gameDetails.results.find(result => result.hasOwnProperty("locked"));
        locked = gameDetails.results.find(result => result.hasOwnProperty("locked"));
        expired = gameDetails.results.find(result => result.hasOwnProperty("gameExpire"));

        if (locked === 'undefined') {
            console.log('Error!!! userLocked is undefined');
        }

       // expired = gameDetails.results.find(result => result.gameExpire)?.gameExpire || null;

        const squareIds = squares.map(square => square.square_id);
        const squareComments = squares.map(square => square.userComment);

        locked = locked.locked[0].userlocked;
        expired = expired.gameExpire[0].expires;

        // console.log('Square Ids: [ ' + squareIds + ' ]');
        // console.log('Square Comments: [ ' + squareComments + ' ]');
        //expired = expired[0].expires;

        console.log('\n\nstart 5.\n\n');
        //console.log(JSON.stringify(results));
        console.log('expiredXX: [ ' + expired + ' ] ');
        console.log('\n\nend\n\n');


    } catch (error) {
        console.error('Error fetching event data:', error.message);
    }

    return {
        props: {
            almonds,
            squares,
            foundUserId,
            gameId,
            email,
            locked,
            expired
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