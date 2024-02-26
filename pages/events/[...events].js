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

export default function Events({
          almonds,
          squares,
          foundUserId,
          gameId,
          email,
          locked,
          expired,
          picksRemain,
          wildAlmond
            }) {
    const [parametersDefined, setParametersDefined] = useState(false);
    const [almondList, setAlmondList] = useState(null);
    const [squaresList, setSquaresList] = useState(null);
    const [lockedStatus, setLockedStatus] = useState(null);
    const [picksRemaining, setPicksRemaining] = useState(null);
    const [curLocked, setCurLocked] = useState('unlocked');
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
        if ((picksRemain != null) || (picksRemain != undefined)) {
            setPicksRemaining(picksRemain);
        }
    }, [almonds, squares, locked]);

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
                        picksRemaining={picksRemaining}
                        setCurLocked={setCurLocked}
                        curLocked={curLocked}
                        wildAlmond={wildAlmond}
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
    let picksRemain = '';
    let foundUserId = '';
    let wildAlmond = '';

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

    if (structuredUrl.userId) { foundUserId = structuredUrl.userId };
    if (structuredUrl.gameId) { gameId = structuredUrl.gameId };
    if (structuredUrl.email) { email = structuredUrl.email };

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

        const gameDetails = results;
        almonds = gameDetails.results.find(result => result.almondDetails)?.almondDetails || [];
        squares = gameDetails.results.find(result => result.squareDetails)?.squareDetails || [];
        locked = gameDetails.results.find(result => result.hasOwnProperty("locked"));
        expired = gameDetails.results.find(result => result.hasOwnProperty("gameExpire"));
        picksRemain = gameDetails.results.find(result => result.hasOwnProperty("picksRemain"));
        wildAlmond = gameDetails.results.find(result => result.hasOwnProperty("wildAlmond"));


        if (locked === 'undefined') {
            console.log('Error!!! userLocked is undefined');
        }

       // expired = gameDetails.results.find(result => result.gameExpire)?.gameExpire || null;

        const squareIds = squares.map(square => square.square_id);
        const squareComments = squares.map(square => square.userComment);

        locked = locked.locked[0].userlocked;
        picksRemain = picksRemain.picksRemain;
        expired = expired.gameExpire[0].expires;
        wildAlmond = wildAlmond.wildAlmond[0].wildalmond;

        console.log('\n\nstart 5.\n\n');
        console.log('wildAlmond: [ ' + wildAlmond + ' ] ');
        // console.log('picks remain: [ ' + picksRemain + ' ] ');
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
            expired,
            picksRemain,
            wildAlmond
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