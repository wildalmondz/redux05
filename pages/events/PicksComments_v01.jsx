import React from 'react';
import PropTypes from 'prop-types';
import './stylesheet/PicksComments.scss';
import { confirmAlert } from 'react-confirm-alert'; // Import

class PicksComments extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: null,
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentDidMount() {
		this._asyncRequest = this.props.onFetchComment(this.props.game_id, this.props.userId);

	}

	componentWillUnmount() {
		if (this.state.comment === '') {
			// alert(`[${this.state.comment}]`);
		}
		let res = encodeURIComponent(this.state.comment);
		res = res.replace(/[/]/g, '%2F')
			.replace(/[?]/g, '%3F')
			.replace(/[']/g, '%27')
			.replace(/["]/g, '%22')
			.replace(/[#]/g, '%23');

		// sends the comment at unmount
		this._asyncRequest = this.props.onSetComment(this.props.game_id, this.props.userId, res);
		setTimeout(() => {
			this._asyncRequest = this.props.onFetchComment(this.props.game_id, this.props.userId);
		}, 250);


		if (this._asyncRequest) {
			this._asyncRequest.cancel();
			this.setState({
				comment: '',
			});
		}
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		if (this.props.locked == null) {
			this.setState({
				[name]: value,
			});
		}
		else if (this.props.locked !== null) {
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
			<form onSubmit={this.handleSubmit} method="post">
				<div id="comment-details">
					<label id="comment-option">Event Comments:(Optional)</label>
					<textarea
						id="comment-section"
						name="comment"
						type="text"
						className="form-control"
						placeholder={this.state.comment}
						maxLength="65535"
						value={""}
						onChange={this.handleInputChange}
						required
					/>
				</div>
			</form>
		);
	}
}

PicksComments.propTypes = {
	comment: PropTypes.array,
	locked: PropTypes.string,
	game_id: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired,
	onFetchComment: PropTypes.func,
	onSetComment: PropTypes.func,
};

PicksComments.defaultProps = {
	onFetchComment: f => f,
	onSetComment: f => f,
};

export default PicksComments;