import React, { Component } from 'react';
import PropTypes from 'prop-types';

function resetMessage(onResetMessage) {
	onResetMessage();
}

class MessageBoard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			exists: true,
			message: this.props.text,
			onResetMessage: this.props.onResetMessage,
		};
	}

	componentDidMount() {
		this._asyncRequest = resetMessage(this.state.onResetMessage);
	}

	componentWillUnmount() {
		if (this._asyncRequest) {
			this._asyncRequest.cancel();
		}
	}

	render() {
		const {
			text,
		} = this.props;
		return (
			this.state.exists &&
			<div><strong style={{color: '#95232F'}}>{text}</strong></div>
		);
	}
}

MessageBoard.propTypes = {
	text: PropTypes.string,
	onResetMessage: PropTypes.func,
};

MessageBoard.defaultProps = {
	text: 'null',
	onResetMessage: f => f,
};

export default MessageBoard;
