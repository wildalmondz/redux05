import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ContainerId } from './lib/containers.js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import './stylesheet/GameDetails.scss';

function redirectMe() {
    confirmAlert({
        title: 'How to select',
        message: 'Click or touch and hold a colored Almond and drag to a Square to make your selection. ' +
            'Almond #1 is your Top Pick. When Picks Remain below is 0, the Lock Picks button will appear. ' +
            'Click Lock Picks and then confirm with an Ok to complete your participation. ' +
            'Single Click or tap an Almond or Square for more details about interacting with those elements.',
        buttons: [
            {
                label: 'Ok',
                onClick: () => {},
            },
        ],
    });
}

class InvitedGameDetails extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {

            // if props set state
            gameId: this.props.match.params.gameId,
            userId: this.props.match.params.userId,
            email: this.props.match.params.email,
            gameName: '',
            gameDescription: '',
            onFetchInvitedGame: this.props.onFetchInvitedGame,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this._asyncRequest = this.props.onFetchInvitedGame(this.state.gameId, this.state.userId, this.state.email);
    }

    componentWillReceiveProps(props) {
        if (props.games[0]){
            this.setState({
                gameName: props.games[0].game_name,
                gameDescription: props.games[0].game_description,
            });
        }
        if (props.emailId){
            this.setState({
                emailId: props.emailId,
            });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
            this.setState({
                gameName: null,
                gameDescription: null,
                tournament_id: null,
            });
        }
    }

    render() {
        return (
            (
                <section id="game-details">
                    <div id="game-intro">
                        <div id="game-title">
                            <h2>{this.state.gameName}</h2>
                            <h3>{this.state.gameDescription}</h3>
                            <p
                                id="help"
                                onClick={() => {
                                    redirectMe();
                                }}
                            >Learn more
                            </p>
                        </div>
                    </div>
                    <ContainerId
                        game_id={this.props.match.params.gameId}
                        userId={this.props.match.params.userId}
                        email={this.props.match.params.email}
                        emailId={this.state.emailId}
                        gameName={this.state.gameName}
                        tournament_id={this.state.tournament_id}
                        comment={this.props.comment}
                    />
                </section>)
        );
    }
}

InvitedGameDetails.propTypes = {
    emailId: PropTypes.string,
    comment: PropTypes.string,
    game_name: PropTypes.string,
    game_description: PropTypes.string,
    onFetchInvitedGame: PropTypes.func,
    onFetchComment: PropTypes.func,
};

InvitedGameDetails.defaultProps = {
    game_name: "Reload",
    game_description: "Reload",
    onFetchInvitedGame: f => f,
    onFetchComment: f => f,
};

export default InvitedGameDetails;
