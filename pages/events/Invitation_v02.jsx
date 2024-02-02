import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import {handler} from "../api";
import { useRouter } from 'next/router';

// https://stackoverflow.com/questions/40352310/how-do-you-mix-componentdidmount-with-react-redux-connect
// https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html (replace componentWillMount)
// http://localhost:3000/events/invitation/5ce32b4b-198b-4c5c-ae9e-98a76d319d5c/6a18296e-afd0-4d0b-846d-86ce54671892/sample06@wildalmondstest.com

/*
function findInvitedUserId(gameId, inviteId, email, onFetchUserId) {
    console.log(`Invitation: game_id => ${gameId} email_id => ${inviteId} email => ${email} `);
    // Below line works adding state to the client so user_id can be found
    onFetchUserId(gameId, inviteId, email);
}

 */

const Invitation = ({ results}) => {

    const router = useRouter();

    const [gameId, setGameId] = useState('5ce32b4b-198b-4c5c-ae9e-98a76d319d5c'); // State for gameId
    const [emailId, setEmailId] = useState('6a18296e-afd0-4d0b-846d-86ce54671892'); // State for managing likes
    const [email, setEmail] = useState('sample06@wildalmondstest.com'); // State for managing likes
    const [inviteNext, setInviteNext] = useState(false); // State for managing likes

    /*
    if (inviteNext === true) {
        alert('gameId: ' + gameId + 'emailId: ' + emailId + ' inviteId => ' + results[0].id + ' <=email: ' + email);
        setInviteNext(false);
    }



    if (inviteNext === true) {
        try {
            router.push(`/events/invitedgame/${gameId}/${results[0].id}/${email}`);
            setInviteNext(false);
        } catch (error) {
            // Handle errors if any
            console.error('Error fetching blog:', error);
        }
    }

     */

    useEffect(() => {
        const fetchData = async () => {



            // localhost:4500/invited/inviteduser/5ce32b4b-198b-4c5c-ae9e-98a76d319d5c/6a18296e-afd0-4d0b-846d-86ce54671892/sample06@wildalmondstest.com


            // code here needs to go get the inviteId

            /*
            if (blogNext === true) {
                try {
                    router.push(`/events/invitedgame/${gameId}/${this.props.userId.id}/${email}`);
                    setBlogNext(false);
                } catch (error) {
                    // Handle errors if any
                    console.error('Error fetching blog:', error);
                }
            }

             */
        };

        // Call the async function immediately
        fetchData();
    }, []);

    return (
        <div id="invitation-details">
            <section id="intro">
                <h1>Welcome to WildAlmonds</h1>
                <div id="intro-top">
                    <ul>
                        <li>You have been selected to participate in the event listed in the card below</li>
                        <li>Please accept this invitation and lock your picks!</li>
                    </ul>
                </div>
            </section>
            <section
                className="invite-card"
            >
                <div id="invite-lines">
                    <div id="messageboard">
                    </div>
                    <h4 id="invite-title">Invitation Card</h4>
                    <ul>
                        <li>
                            <strong>From:</strong> Email Here!
                        </li>
                        <li>
                            <strong>Event:</strong> Game_Name
                        </li>
                        <li>
                            <strong>Description:</strong> Game Description
                        </li>
                    </ul>
                </div>
                <div id="accept">
                    <Button variant="contained" onClick={() => { setInviteNext(false) }}>Accept</Button>
                </div>
                <div id="terms">
                    <p>
                        <br />
                        By accepting, you are at least age 21, agree to receive email from the event host and to use of the site as
                        explained in our{' '}
                        <a href="/about/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>{' '}
                        and{' '}<a href="/about/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                        {/*<a href="https://wildalmonds.com/about/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> */}
                    </p>
                </div>
            </section>
        </div>
    );

};

export async function getStaticProps() {

    const results = await handler(`http://localhost:4500/invited/inviteduser/5ce32b4b-198b-4c5c-ae9e-98a76d319d5c/6a18296e-afd0-4d0b-846d-86ce54671892/sample06@wildalmondstest.com`
    )
    // The value of the `props` key will be
    //  passed to the `Home` component
    return {
        props: {
            results
        }
    }
}

export default Invitation;

/*
class Invitation extends Component {
    state = {
        gameId: this.props.match.params.gameId,
        inviteId: this.props.match.params.emailId,
        email: this.props.match.params.email,
        gameName: this.props.games.game_name,
        externalData: null,
        onFetchUserId: this.props.onFetchUserId,
    };

    componentDidMount() {
        this._asyncRequest = findInvitedUserId(
            this.state.gameId,
            this.state.inviteId,
            this.state.email,
            this.state.onFetchUserId
        );
    }

    componentWillUnmount() {
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
    }
    render() {
        const {
            email,
        } = this.props;
        return (
            <div id="invitation-details">
                <section id="intro">
                    <h1>Welcome to WildAlmonds</h1>
                    <div id="intro-top">
                        <Clock />
                        <ul>
                            <li>You have been selected to participate in the event listed in the card below</li>
                            <li>Please accept this invitation and lock your picks!</li>
                        </ul>
                    </div>
                    <InviteCards email={email}/>
                </section>
            </div>
        );
    }
}

Invitation.propTypes = {
    game_name: PropTypes.string,
    games: PropTypes.array,
    userId: PropTypes.string,
    email: PropTypes.string,
    onFetchUserId: PropTypes.func,
};

Invitation.defaultProps = {
    onFetchUserId: f => f,
};

export default withRouter(Invitation);

 */
