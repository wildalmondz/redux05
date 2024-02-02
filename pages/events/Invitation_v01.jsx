import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clock from '../main/Clock.jsx';
import './stylesheet/Invitation.scss';
import { InviteCards } from './lib/containers.js';
import { withRouter } from 'react-router';

// https://stackoverflow.com/questions/40352310/how-do-you-mix-componentdidmount-with-react-redux-connect
// https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html (replace componentWillMount)
// http://localhost:3000/events/invitation/5ce32b4b-198b-4c5c-ae9e-98a76d319d5c/6a18296e-afd0-4d0b-846d-86ce54671892/sample06@wildalmondstest.com

function findInvitedUserId(gameId, inviteId, email, onFetchUserId) {
    console.log(`Invitation: game_id => ${gameId} email_id => ${inviteId} email => ${email} `);
    // Below line works adding state to the client so user_id can be found
    onFetchUserId(gameId, inviteId, email);
}

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
