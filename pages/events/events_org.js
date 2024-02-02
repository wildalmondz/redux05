import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {handler} from "../api";
import Almonds from './Almonds'
import Squares from './Squares'

export default function Events({ gameDetail, structuredUrl }) {
    const router = useRouter();

    const [gameId, setGameId] = useState(0); // State for managing game_id
    const [gameName, setGameName] = useState(0); // State for managing game_id
    const [gameDescription, setGameDescription] = useState(0); // State for managing game_id

    useEffect(() => {

        if ((gameDetail) && (gameDetail.game_id)) { setGameId(gameDetail.game_id); }
        if ((gameDetail) && (gameDetail.game_name)) { setGameName(gameDetail.game_name); }
        if ((gameDetail) && (gameDetail.game_description)) { setGameDescription(gameDetail.game_description); }

        // Check if structuredUrl.post exists before accessing its properties
        if (structuredUrl && structuredUrl.post !== null) {
            /*
            router.push(
                `/blogs/${structuredUrl.type}/${structuredUrl.slug}/${structuredUrl.post}`
            );

             */
        }
    }, [structuredUrl, router]);

    return (
        <div>
            <h1>Game Details</h1>
            <ul>
                <li>Game Id: {gameId}</li>
                <li>Game Name: {gameName}</li>
                <li>Game Description: {gameDescription}</li>
            </ul>
            <h4></h4>
            <Almonds />
            <Squares />
        </div>
    );
}

export async function getStaticProps({ params }) {
    const { events } = params;

    const structuredUrl = {
        type: events[0] || '',
        gameId: events[1] || '',
        inviteId: events[2] || '',
        email: events[3] || '',
    };

    const results = await handler(`http://localhost:4500/games/gamemaster/5ce32b4b-198b-4c5c-ae9e-98a76d319d5c/6a18296e-afd0-4d0b-846d-86ce54671892/sample06@wildalmondstest.com`
    )

    // console.log(results[0][0]);
    const gameDetail = results[0][0][0];
    console.log(`Game ID?  ${gameDetail.game_id} `);

    return {
        props: {
            gameDetail,
            structuredUrl,
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