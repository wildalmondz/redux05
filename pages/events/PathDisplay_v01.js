import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// https://reactjs.org/docs/state-and-lifecycle.html
import './stylesheet/Container.scss';
import './stylesheet/SquareComments.scss';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios/index';
import { SquareCommentId } from './lib/containers.js';

function redirectMe(squareUrl) {
    window.open(`${squareUrl}`);
}

function redirectReview(childId, emailAddress) {
    /*
    Call an action that returns new state for this instead of the call to apidev and redirect to invitation
     */
    axios.get(`http://localhost:4500/apidev/checkprior/${childId}/${emailAddress}`, {})
        .then((response) => {
            if (response.data !== 'undefined') {
                window.open('http://localhost:3000/events/invitation/' + childId + '/' + response.data[0].foundEmailId + '/' + emailAddress);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function UserGreeting(props) {
    return <p></p>;
}

function GuestGreeting(props) {
    return <p>Click a square for details!</p>;
}

function NoImage(props) {
    return null;
}

function NoUrl(props) {
    return null;
}

function Url(props) {
    return (
        <button id="pathbutton">
            <img id="redirectimg"
                 src={props.img}
                 alt="Web"
                 onClick={() => redirectMe(props.urlPath)}
                // onMouseOver={() => redirectMe(props.urlPath)}
            />
        </button>
    );
}

function ReviewUrl(props) {
    return (
        <button id="pathbutton">
            <img id="redirectimg"
                 src={props.img}
                 alt="Web"
                 onClick={() => redirectReview(props.childId, props.email)}
                // onMouseOver={() => redirectMe(props.urlPath)}
            />
        </button>
    );
}

function Descript(props) {
    return (
        <h4>{props.descText}</h4>
    );
}

function TitleName(props) {
    return (
        <h3>{props.nameText}</h3>
    );
}

function MapUrl(props) {
    const mapUrl = props.hasUrl;
    const buttonName = props.name;
    if (mapUrl) {
        return <Url
            urlPath={mapUrl}
            name={buttonName}
            img={'https://wildalmonds.com/api/uploads/d7e3b622-3fa5-4ce3-8943-0fca05377c74_map.jpg'}
        />;
    }
    return <NoUrl />;
}

function ReserveUrl(props) {
    const reserveUrl = props.hasUrl;
    const buttonName = props.name;
    if (reserveUrl) {
        return <Url
            urlPath={reserveUrl}
            name={buttonName}
            img={'https://wildalmonds.com/api/uploads/50b154a7-ec8c-4c22-8e44-07600f9dd7b0_schedule.jpg'}
        />;
    }
    return <NoUrl />;
}

function SquareUrl(props) {
    const squareUrl = props.hasUrl;
    const buttonName = props.name;
    if (squareUrl) {
        return <Url
            urlPath={squareUrl}
            name={buttonName}
            img={'https://wildalmonds.com/api/uploads/711df310-0bf0-4895-aa17-c1794c33c01b_shop.jpg'}
        />;
    }
    return <NoUrl />;
}

function VideoUrl(props) {
    const videoUrl = props.hasUrl;
    const buttonName = props.name;
    if (videoUrl) {
        return <Url
            urlPath={videoUrl}
            name={buttonName}
            img={'https://wildalmonds.com/api/uploads/b04ae037-9e9e-4489-8cce-ca052e2b032c_video.jpg'}
        />;
    }
    return <NoUrl />;
}

function Review(props) {
    const buttonName = props.name;
    const refPath = props.childUrl + '/' + props.emailId + '/' + props.email;

    if (refPath) {
        return <ReviewUrl
            childId={props.childId}
            email={props.email}
            name={buttonName}
            img={'https://wildalmonds.com/api/uploads/3c0e4e77-2880-416c-bf73-b7e3c3de977d_fwdReview.jpeg'}
        />;
    }
    return <NoUrl />;
}

function ChildUrl(props) {
    const childId = props.child_id;
    const childUrl = props.childUrl;

    const buttonName = props.name;
    if ((childId != undefined) || (childId != null)) {

        return <Review
            childUrl={childUrl}
            childId={props.child_id}
            emailId={props.emailId}
            email={props.email}
            hist={props.hist}
            name={buttonName}  />;
    }
    return null;
}

function Description(props) {
    const desc = props.hasDescription;
    if (desc) {
        return <Descript descText={desc}/>;
    }
    return null;
}

function SquareImage(props) {
    const sqImg = props.hasImage;
    const sqName = props.hasName;

    if (sqImg) {
        return (
            <figure id="pathfigure">
                <img
                    id="pathimage"
                    src={sqImg}
                    alt={sqName}
                    onClick={() => redirectMe(sqImg)}
                />
            </figure>
        );
    }
    return null;
}

function SquareName(props) {
    const sqName = props.hasName;
    if (sqName) {
        return <TitleName nameText={sqName}/>;
    }
    return <GuestGreeting />;
}

const filterValue = (obj, key) => obj.find(v => v[key]);

function SquareComment(props) {
    const squareDetail = props.squaredetail[0];

    if ((squareDetail !== undefined) &&
        (squareDetail[0] !== undefined) &&
        (squareDetail[0].square_id !== null) &&
        (squareDetail[0].square_name !== null)) {
        return (
            <div id="adonly">
                <SquareCommentId
                    squareDetail={squareDetail}
                    game_id={props.data.game_id}
                    userId={props.data.userId}
                />
            </div>
        );
    }
    return (
        <div id="squareonly">
            <br />
            <h4>(click a square to add comments)</h4>
        </div>
    );
}
/*
// do not remove!! Working for ads
function AdsOnly() {
  return (
    <div id="adonly">
      <section id="imagesection">
        <figure id="squareimage">
          <img id="squareimg" src="http://localhost:4500/uploads/7628120d-cee9-46ed-b25b-5f0b9bbed718_wineSample_1.jpg" alt="A description of what this is" />
          <figcaption>Contact us today!</figcaption>
        </figure>
      </section>
      <section id="detailsection">
        <h3>WildAlmonds Ads</h3>
        <span id="linkurl"><a href="https://wildalmonds.com/about" onClick={() => redirectMe('https://wildalmonds.com/about')}>WildAlmonds</a></span>
        <h4>We get your company and products in front of a wide audience!</h4>
      </section>
    </div>
  );
}
*/

let squareDetail;
let userId;
let imagePath;
let squareUrl;
let squareDescription;
let squareName;

function SquareOnly(props) {
    squareDetail = props.squaredetail[0];
    userId = props.userId;
    let emailAddr = props.email;
    let emailId = props.emailId;

    let child_id;
    let childUrl;
    let imagePath;
    let reserveUrl;
    let squareUrl;
    let videoUrl;
    let mapUrl;

    let squareDescription;
    let squareName;

    if ((squareDetail !== undefined) &&
        (squareDetail[0] !== undefined)) {

        if (squareDetail[0].child_id) { child_id = squareDetail[0].child_id; }
        if (squareDetail[0].childUrl) { childUrl = squareDetail[0].childUrl; }
        if (squareDetail[0].square_description) {	squareDescription = squareDetail[0].square_description; }
        if (squareDetail[0].square_name) { squareName = squareDetail[0].square_name; }
        if (squareDetail[0].image_path) { imagePath = squareDetail[0].image_path; }
        if (squareDetail[0].square_url) { squareUrl = squareDetail[0].square_url; }
        if (squareDetail[0].reserve_url) { reserveUrl = squareDetail[0].reserve_url; }
        if (squareDetail[0].video_url) { videoUrl = squareDetail[0].video_url; }
        if (squareDetail[0].map_url) { mapUrl = squareDetail[0].map_url; }

    }
    return (
        <div id="squareonly">
            <div id="squarecontainer">
                <div id="pathbuttons">
                    <ChildUrl
                        child_id={child_id}
                        childUrl={childUrl}
                        gameId={props.gameId}
                        emailId={emailId}
                        userId={userId}
                        email={emailAddr}
                        hist={props.history}
                        name='Review'
                    />
                    <MapUrl hasUrl={mapUrl} history={props.history} name='Map' />
                    <ReserveUrl hasUrl={reserveUrl} history={props.history} name='Scheduling' />
                    <VideoUrl hasUrl={videoUrl} history={props.history} name='Video' />
                    <SquareUrl hasUrl={squareUrl} history={props.history} name='Web Site' />
                </div>
                <div className="product-container" style={{backgroundImage: imagePath}}>
                    {
                        (imagePath != null) ?
                            <img
                                height='150px'
                                width='150px'
                                src={imagePath}
                                alt="Product Image"/>
                            :
                            <img
                                height='100px'
                                width='100px'
                                src='https://wildalmonds.com/api/uploads/2a432b2a-5862-46ca-adcf-eac67a0c20ab_wildAlmondsLogo.jpeg'
                                alt="WildAlmonds"/>
                    }
                    <div className="product-content">
                        <SquareName hasName={squareName} />
                        <Description hasDescription={squareDescription} />
                    </div>
                </div>
            </div>
        </div>
    );
}
//<ChildUrl child_id={child_id} gameId={props.gameId} email_id={props.email_id} userId={userId} email={props.email} hist={props.history} name='Review' />

function PathGreeting(props) {
    const squarepath = props.squarepath;
    const squares = props.squares;
    // Need to find the team that we are searching for
    // Find the team names by div
    // find items in the object:
    // square and division

    const foundRank = (filterValue(squarepath, 'squareRank'));
    const foundDiv = (filterValue(squarepath, 'division'));

    const ranking = parseInt(foundRank.squareRank);
    const division = foundDiv.division;

    const rankFilter = squares.filter(rank => rank.square_rank === ranking);
    const rankings = rankFilter.filter(item => item.square_division === division);

    // const isChild = rankings[0].square_url;

    if ((rankings[0]) &&
        (rankings[0].square_description !== null) &&
        (rankings[0].square_url !== null) &&
        (rankings[0].square_name !== null) &&
        (rankings[0].lastDroppedItem !== null) &&
        (rankings[0].square_division !== null)) {
        return (
            <div id="column1">
                <ul id="name">{rankings[0].square_name}</ul>
                <ul id="link" onClick={() => redirectMe(rankings[0].square_url)}>{rankings[0].square_url}</ul>
                <ul><strong>Almond:</strong> {rankings[0].lastDroppedItem}</ul>
                <ul><strong>Event Status:</strong> {rankings[0].square_status}</ul>
                <ul><strong>Division:</strong> {rankings[0].square_division}</ul>
                <ul id="description"><strong>Description:</strong> {rankings[0].square_description}</ul>
            </div>
        );
    }
    if ((rankings[0]) &&
        (rankings[0].square_description !== null) &&
        (rankings[0].square_url !== null) &&
        (rankings[0].square_name !== null) &&
        (rankings[0].square_division !== null)) {
        return (
            <div id="column1">
                <ul id="name">{rankings[0].square_name}</ul>
                <ul id="link" onClick={() => redirectMe(rankings[0].square_url)}>{rankings[0].square_url}</ul>
                <ul><strong>Almond:</strong> Not selected</ul>
                <ul><strong>Event Status:</strong> {rankings[0].square_status}</ul>
                <ul><strong>Division:</strong> {rankings[0].square_division}</ul>
                <ul id="description"><strong>Description:</strong> {rankings[0].square_description}</ul>
            </div>
        );
    } else if ((rankings[0]) &&
        (rankings[0].square_division !== null) &&
        (rankings[0].square_name !== null) &&
        (rankings[0].lastDroppedItem !== null) &&
        (rankings[0].square_url !== null)) {
        return (
            <div id="column1">
                <ul id="name">{rankings[0].square_name}</ul>
                <ul id="link" onClick={() => redirectMe(rankings[0].square_url)}>{rankings[0].square_url}</ul>
                <ul><strong>Almond:</strong> {rankings[0].lastDroppedItem}</ul>
                <ul><strong>Event Status:</strong> {rankings[0].square_status}</ul>
                <ul><strong>Division:</strong> {rankings[0].square_division}</ul>
            </div>
        );
    } else if ((rankings[0]) &&
        (rankings[0].square_division !== null) &&
        (rankings[0].square_name !== null) &&
        (rankings[0].lastDroppedItem !== null)) {
        return (
            <div id="column1">
                <ul id="name">{rankings[0].square_name}</ul>
                <ul><strong>Almond:</strong> {rankings[0].lastDroppedItem}</ul>
                <ul><strong>Event Status:</strong> {rankings[0].square_status}</ul>
                <ul><strong>Division:</strong> {rankings[0].square_division}</ul>
            </div>
        );
    } else if ((rankings[0]) &&
        (rankings[0].square_division !== null) &&
        (rankings[0].square_name !== null) &&
        (rankings[0].square_url !== null) &&
        (rankings[0].lastDroppedItem !== null)) {
        return (
            <div id="column1">
                <ul id="name">{rankings[0].square_name}</ul>
                <ul id="link" onClick={() => redirectMe(rankings[0].square_url)}>{rankings[0].square_url}</ul>
                <ul><strong>Almond:</strong> [Not picked]</ul>
                <ul><strong>Event Status:</strong> {rankings[0].square_status}</ul>
                <ul><strong>Division:</strong> {rankings[0].square_division}</ul>
            </div>
        );
    } else if ((rankings[0]) &&
        (rankings[0].square_division !== null) &&
        (rankings[0].square_name !== null)) {
        return (
            <div id="column1">
                <ul><strong>{rankings[0].square_name}</strong></ul>
                <ul><strong>Division:</strong> {rankings[0].square_division}</ul>
            </div>
        );
    } else if ((rankings[0]) &&
        (rankings[0].square_division !== null) &&
        (rankings[0].square_url !== null)) {
        return (
            <div id="column1">
                <ul><strong>{rankings[0].square_name}</strong></ul>
                <ul><strong>Division:</strong> {rankings[0].square_division}</ul>
                <ul id="link" onClick={() => redirectMe(rankings[0].square_url)}>{rankings[0].square_url}</ul>
            </div>
        );
    } else if ((rankings[0]) &&
        (rankings[0].square_division !== null)) {
        return (
            <div id="column1">
                <ul><strong>Division:</strong> {rankings[0].square_division}</ul>
            </div>
        );
    } else if ((rankings[0]) &&
        (rankings[0].square_url !== null)) {

        return (
            <div id="column1">
                <ul><strong>URL:</strong> {rankings[0].square_url}</ul>
            </div>
        );
    } else if ((rankings[0] === undefined) || (rankings[0] === null)) {
        return (
            <div id="column1">
                <p>WildAlmonds</p>
            </div>
        );
    }
}

function PathUp(props) {
    return (
        <p>
            {
                props.squarepath.map(squareDeets => (
                    <p>
						<span>
                Square id: {squareDeets.squareRank}
						</span>
                        <span>
                Next match: {squareDeets.nextMatch}
						</span>
                        <br />
                        <span>
              Squares Active <strong>{props.activeSquares}</strong> of {props.squareCount}
						</span>
                        <br />
                        {
                            squareDeets.Rounds.map(roundDetail => (
                                <section id="rounds">
                                    <h5>{roundDetail.text}</h5>
                                    {roundDetail.rank.map((seed, i) => (
                                        <ul key={i}>
                                            <span>Winner of:</span>
                                            <span>{seed.high} vs {seed.low}</span>
                                        </ul>))}
                                </section>
                            ))
                        }
                    </p>
                ))
            }
        </p>
    );
}

class PathDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.match.params.email,
            squaredetail: props.squaredetail,
            squarepath: props.squarepath,
            squares: props.squares,
            activeSquares: props.activeSquares,
            squareCount: props.squareCount,
            locked: props.locked,
            game_id: props.game_id,
            userId: props.userId,
            comment: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
    }

    componentWillReceiveProps(props) {
        this.setState({
            email_id: props.email_id,
            squaredetail: props.squaredetail,
            squarepath: props.squarepath,
            squares: props.squares,
            activeSquares: props.activeSquares,
            squareCount: props.squareCount,
        });
    }

    componentWillUnmount() {
        this.setState({
            squaredetail: [],
            squarepath: [],
            squares: [],
            comment: null,
            activeSquares: null,
            squareCount: null,
            locked: null,
            game_id: null,
            userId: null,
        });
        squareDetail = null;
        userId = null;
        imagePath = null;
        squareUrl = null;
        squareDescription = null;
        squareName = null;
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (this.props.locked === null) {
            this.setState({
                [name]: value,
            });
        } else if (this.props.locked !== null) {
            confirmAlert({
                title: 'No further changes allowed',
                message: `Locked at [${this.props.locked}]`,
                buttons: [
                    {
                        label: 'Ok',
                        onClick: () => {},
                    },
                ],
            });
        }
    }

    render() {
        return (
            (this.props.squarepath[0] !== undefined) ?
                <section id="path-dashboard">
                    <div id="boxes">
                        <PathGreeting
                            squarepath={this.state.squarepath}
                            squares={this.state.squares}
                        />
                        <div id="column2">
                            <p>Path to Final</p>
                            <PathUp
                                squarepath={this.state.squarepath}
                                activeSquares={this.state.activeSquares}
                                squareCount={this.state.squareCount}
                            />
                        </div>
                    </div>
                </section>
                :
                <div id="boxes">
                    <SquareOnly
                        squaredetail={this.state.squaredetail}
                        emailId={this.props.emailId}
                        gameId={this.state.game_id}
                        userId={this.state.userId}
                        email={this.state.email}
                        history={this.props.history}
                    />
                    <SquareComment
                        squaredetail={this.state.squaredetail}
                        squares={this.state.squares}
                        locked={this.props.locked}
                        handleInputChange={this.handleInputChange}
                        data={this.state}
                        onFetchInvitedGame={() => this.onFetchInvitedGame(this.game_id, this.userId)}
                        // onFetchInvitedSquares={() => this.onFetchInvitedSquares(this.game_id, this.userId)}
                    />
                </div>
        );
    }
}

PathDisplay.propTypes = {
    emailId: PropTypes.string,
    game_id: PropTypes.string,
    square_url: PropTypes.string,
    reserve_url: PropTypes.string,
    video_url: PropTypes.string,
    map_url: PropTypes.string,
    squaredetail: PropTypes.array,
    squarepath: PropTypes.array,
    squares: PropTypes.array,
    activeSquares: PropTypes.number,
    locked: PropTypes.string,
    userId: PropTypes.string,
    onFetchInvitedGame: PropTypes.func,
    onFetchInvitedSquares: PropTypes.func,
};

PathDisplay.defaultProps = {
    squaredetail: [],
    squarepath: [],
    squares: [],
    activeSquares: 0,
    locked: 'Not found',
};

export default withRouter(PathDisplay);