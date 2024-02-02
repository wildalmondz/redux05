import React from 'react';
import PropTypes from 'prop-types';
import BoardSquare from './BoardSquare_Container.jsx';
import ItemTypes from './ItemTypes';
import './stylesheet/Container.scss';

const tourneyLength = [];

function BlankReply() {
	return (null);
}

function DivisionGreeting(props) {
	const targetSquares = props.squares;
	const targetRow = props.round[0].rows;

	tourneyLength.push({
		length: targetSquares.length,
	});

	return (
		<fieldset id={props.id}>
			<legend>{props.division}</legend>
			{targetRow.map(row =>
				(
					<div id="tourney-item">
						{targetSquares.map(square =>
							(((square.square_division === props.division) && (square.row === row.name)) ?
								(<BoardSquare
									{...square}
									key={square.square_id}
									row={square.row}
									accepts={ItemTypes.ALMOND}
									activeSquares={props.activeSquares}
									squareCount={props.squareCount}
									onDrop={() => props.onDrop(item => this.handleDrop(square.square_id, item))}
								/>)
								:
								<BlankReply />))
						}
					</div>))}
		</fieldset>
	);
}


const SquareList = ({
	email, gameName, game_id, userId, activeSquares, squareCount, squares = [], divisions = [], round = [], onDrop = f => f,
}) =>
	(<div id="square-list">
		{((divisions) && (divisions[0])) ?
			divisions.map(division =>
				(<div id="tourney-container" key={division.id}>
					<DivisionGreeting
						{...division}
						squares={squares}
						round={round}
						activeSquares={activeSquares}
						squareCount={squareCount}
						boardType={squares.length}
						onDrop={() => onDrop(item => this.handleDrop(squares.square_id, item))}
					/>
				</div>))
			:
			<div id="square-only">
				{
					squares.map(square =>
						(<BoardSquare
							{...square}
							email={email}
							game_id={game_id}
							gameName={gameName}
							userId={userId}
							key={square.square_id}
							accepts={ItemTypes.ALMOND}
							onDrop={() => onDrop(item => this.handleDrop(square.square_id, item))}
						/>))
				}
			</div>}
	</div>);

SquareList.propTypes = {
	email: PropTypes.string,
	game_id: PropTypes.string,
	gameName: PropTypes.string,
	userId: PropTypes.string,
	activeSquares: PropTypes.number,
	squareCount: PropTypes.number,
	almonds: PropTypes.array,
	squares: PropTypes.array,
	divisions: PropTypes.array,
	round: PropTypes.array,
	onFetch: PropTypes.func,
	onDrop: PropTypes.func,
};

export default SquareList;
