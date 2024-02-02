import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { DropTarget } from 'react-dnd';
import {fetchSquarePath, checkSquareComment, fetchSquareDetail} from "../../../actions.js";
import './stylesheet/Container.scss';
import axios from "axios/index";

const ItemTypes = {
    ALMOND: 'almond',
};

const squareTarget = {
    canDrop(props) {
        if ((props.lastDroppedItem) || (props.isAd)) {
            return false;
        }
        else {
            return true;
        }
    },
    drop(props, monitor) {
        // 2/21/19 Line below needed to print Almond name on Square
        props.onDrop(monitor.getItem());
        // needed to return the square_id back to Almond endDrag
        return { name: props.square_id };
    },
};

function findSquareDetail(userId, gameId, gameName, email, child_id, squareId) {
    let dashOk;  //debug for response
    let addOk;   //make sure no error from response

    let res = encodeURIComponent(gameName);
    res = res.replace(/[/]/g, '%2F').replace(/[?]/g, '%3F').replace(/[#]/g, '%23').replace(/'/g, '%27');
    const newVal = res;


    if ((child_id != undefined) || (child_id != null)) {

        setTimeout(() => {
        axios.post(`http://localhost:4500/apidev/addinvitation_v2/${child_id}/${newVal}/${userId}/${email}`, {})
            .then((response) => {
                if (response.data !== 'undefined') {
                    dashOk = true;
                    if (/^20000/.test(response.data)) {
                        addOk = true;
                    } else {
                        return (response);
                    }
                }
            })
            .then((response) => {
                if (response.data !== 'undefined') {
                    dashOk = true;
                    if (/^20000/.test(response.data)) {
                        addOk = true;
                    }
                    else if (/^31000/.test(response.data)) {
                        alert('31000 ?' + JSON.stringify(response.data));
                        return (response);
                    }

                    else {
                        return (response);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }, 250);
    }
    store.dispatch(fetchSquareDetail(userId, gameId, squareId));
}

function findSquarePath(gameId, groupId, division, squareId, activeSquares, squareCount) {
    store.dispatch(fetchSquarePath(gameId, groupId, division, squareId, activeSquares, squareCount));
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        getDropResult: monitor.getDropResult(),
        itemType: monitor.getItem(),
    };
}



class BoardSquare extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // this._asyncRequest = this.props.onFetchSquareComment(this.props.userId, this.props.game_id, this.props.squareId);
    }

    componentWillReceiveProps(props) {
    }

    componentWillUnmount() {
    }

    handleChange(event, userId, gameId, gameName, email, child_id, ranking, division, squareId, activeSquare, squareCount, isAd) {
        event.preventDefault();

        this.setState({
            gameId: gameId,
            rank: ranking,
            division: division,
            squareId: squareId,
            active: activeSquare,
            squareCnt: squareCount,
        });

        if (division === 'Squares') {
            setTimeout(() => {
                findSquareDetail(userId, gameId, gameName, email, child_id, squareId);
            }, 250);
        }
        else {
            setTimeout(() => {
                findSquarePath(gameId, this.state.rank, this.state.division, this.state.squareId, this.state.active, this.state.squareCnt);
            }, 500);
        }
    }

    handleSubmit(event) {
        const res = encodeURIComponent(this.state.value);
        event.preventDefault();

        this.props.onSetComment(this.props.game_id, this.props.userId, res);
    }

    onClickHandler = (event, userId, gameId, gameName, email, child_id, ranking, division, squareId, activeSquare, squareCnt, isAd) => {
        if (division === 'Squares') {
            setTimeout(() => {
                alert(`${userId}, ${gameId}, ${gameName}, ${email}, ${child_id}, ${squareId}`)
                // findSquareDetail(userId, gameId, gameName, email, child_id, squareId);
            }, 250);
        }
        else {
            setTimeout(() => {
                findSquarePath(gameId, this.state.rank, this.state.division, this.state.squareId, this.state.active, this.state.squareCnt);
            }, 500);
        }
    }

    render() {
        const isActive = this.props.isOver && this.props.canDrop;
        let mouseOver = false;
        let status = '';

        let color = 'black';
        let backgroundColor = 'lightgrey';
        let border = '1px hidden black';
        let backgroundImage = 'url(https://wildalmonds.com/api/uploads/f9cb4ed1-aaba-49bf-96fc-77a365714851_brilliant.png)';

        if (isActive) {
            backgroundColor = '#92ad44';
        } else if (this.props.canDrop !== false) {
            backgroundColor = '#ccd1be';
        }
        if (this.props.userComment) {
            border = '3px groove green';
        }
        if (this.props.almond_available) {
            backgroundColor = this.props.almond_available;
        }

        let almondDisplay;
        if ((this.props.square_status === 'inactive') && (this.props.lastDroppedItem)) {
            almondDisplay =
                (
                    <p id="squareout"><strong>inactive <del>[{JSON.stringify(this.props.lastDroppedItem)}]</del></strong></p>
                );
            backgroundColor = 'black';
            color = 'white';
        } else if (this.props.square_status === 'inactive')  {
            almondDisplay =
                (
                    <p id="squareout"><strong>inactive</strong></p>
                );
            backgroundColor = 'black';
            color = 'white';
        } else if ((this.props.lastDroppedItem) && (this.props.lastDroppedItem === 1)) {
            almondDisplay =
                (
                    <p id="toppick"><strong>Top [ 1 ]</strong></p>
                );
        } else if ((this.props.square_status === 'active') && (this.props.lastDroppedItem))  {
            almondDisplay = <p id="squaredrop"><strong>[ {JSON.stringify(this.props.lastDroppedItem)} ]</strong></p>;
        } else {
            almondDisplay = <p />;
        }

        return this.props.connectDropTarget(
            <div id="squareArea"
                 style={{
                     border,
                     backgroundColor,
                     color,
                     backgroundImage,
                 }}

                 onClick={() => {this.onClickHandler(
                     event,
                     this.props.userId,
                     this.props.game_id,
                     this.props.gameName,
                     this.props.email,
                     this.props.child_id,
                     this.props.square_rank,
                     this.props.square_division,
                     this.props.square_id,
                     this.props.activeSquares,
                     this.props.squareCount)}}
                 onMouseEnter={() => { mouseOver = true; }}
                 onMouseLeave={() => { mouseOver = false; }}
            >
                {this.props.children}
                <div id="squareName"
                     style={{
                         width: '75px',
                         height: '2.7em',
                         overflow: 'hidden',
                         fontSize: '11px',
                         lineHeight: 'initial',
                         fontWeight: '500',
                     }}>
                    {this.props.square_status !== 'inactive' ? this.props.square_name : <del>{this.props.square_name}</del>}
                </div>
                {isActive ?
                    <div id="release">
                        <br />Release!</div> :
                    ''
                }
                {this.props.image_path && (
                    <img src={this.props.image_path} width="70" height="70" />
                )}
                {almondDisplay}
            </div>);
    }
}

BoardSquare.propTypes = {
    game_id: PropTypes.string.isRequired,
    gameName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    activeSquares: PropTypes.number,
    almond_available: PropTypes.string,
    child_id: PropTypes.string,
    squareCount: PropTypes.string,
    square_id: PropTypes.number.isRequired,
    square_name: PropTypes.string.isRequired,
    square_division: PropTypes.string.isRequired,
    square_description: PropTypes.string.isRequired,
    square_rank: PropTypes.number.isRequired,
    square_status: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    image_path: PropTypes.string,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    onDrop: PropTypes.func.isRequired,
    getDropResult: PropTypes.object,
    lastDroppedItem: PropTypes.number,
    connectDropTarget: PropTypes.func.isRequired,
    children: PropTypes.node,
    isAd: PropTypes.bool,
};

BoardSquare.defaultProps = {
    connectDropTarget: f => f,
};

export default DropTarget(ItemTypes.ALMOND, squareTarget, collect)(BoardSquare);