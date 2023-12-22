import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import ReCAPTCHA from 'react-google-recaptcha';
import { v4 } from 'uuid';
import axios from 'axios';
import './stylesheet/InvitePendingForm.scss';
import { MessageBoardId } from '../main/lib/containers.js';
import Button from '@mui/material/Button';


let allNew = [];
let promises = [];
let count = 0;
const timeWait = 1200;
const messageWait = 3200;

function urlEncode2(name, userQuery) {
	return new Promise((resolve, reject) => {
		let res = encodeURIComponent(userQuery);
		res = res.replace(/[/]/g, '%2F').replace(/[?]/g, '%3F').replace(/[#]/g, '%23').replace(/'/g, '%27');
		const newVal = res;
		if (name === 'eventname') { allNew.push({ eventname: newVal }); }
		if (name === 'displayName') { allNew.push({ displayName: newVal });
		}

		const err = 'Error!';
		resolve(newVal);
		reject(err);
	});
}

function sendIt (gameId, gameName, email, count, token, sendMessage) {
	count++;
	let userId = v4();
	let emailId = v4();
	let inviteId = v4();

	let newsMessage = 'WildAlmonds';

	return new Promise((resolve, reject) => {
		const err = 'Error!';

		axios.post(`http://localhost:4500/apidev/subscribe/${token}`)
			.then((response) => {
				if (response.data.success === true) {
					axios.post(`http://localhost:4500/invited/writeInviteUser/${userId}/${gameId}/${gameName}/${email}/${emailId}/${inviteId}/${email}`)
						.then((response) => {
							if (response.data !== 'undefined') {
								// alert(response.data);
								console.log('Response Data: [' + response.data + ' ]');
								if ((/^301/.test(response.data) || (/^302/.test(response.data)))) {
									newsMessage = `Email Address ${email} is already a reviewer of this event`;

									// this.setState({
									token='null';
									// });
								}
								else if (/^309/.test(response.data)) {
									newsMessage = `${email} has asked to not participate in WildAlmonds events`;

									// this.setState({
									token='null';
									// });
								}
								else if (response.data.affectedRows === 1) {
									newsMessage = `Thank you. ${email} has been added! Check your email.`;
								}

								sendMessage(newsMessage);
								newsMessage = '';
								setTimeout(() => {
									return sendMessage('');
								}, messageWait);

							}
						}).then((messageReady) => {
							console.log(messageReady);

						}).catch((error) => {
							console.log(error);
						});
				}
			});

		resolve(count);
		reject(err);
	});
}

class InviteBlog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			slug: this.props.match.params.slugName,
			emailAddr: '',
			token: null,
			marker: 1,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChange = this.onChange.bind(this);

	}

	componentDidMount() {
	}

	onChange(value) {
		this.setState({
			token: value
		});
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		// let token = this.captcha.getValue();
		this.captcha.reset();

		const sendMessage = this.props.onMessage;
		let newsMessage = '';

		if (this.state.token === null) {
			newsMessage = 'Please check ReCAPTCHA';
			sendMessage(newsMessage);
			setTimeout(() => {
				return sendMessage('');
			}, messageWait);
		}

		promises.push(urlEncode2('eventname', this.props.game_name));
		promises.push(sendIt(
			this.props.game_id,
			this.props.game_name,
			this.state.emailAddr,
			count,
			this.state.token,
			this.props.onMessage));

		this.setState({
			emailAddr: '',
			token: null,
		});


		Promise.all(promises)
			.then((result) => {
				console.log('Result:' + JSON.stringify(result));
				promises = [];
				allNew = [];
			});

		setTimeout(() => {
			allNew = [];
		}, timeWait);



	}


	render() {
		let emailOk;
		if (this.state.marker) {
			emailOk =
                (
                	<form onSubmit={this.handleSubmit}>
                		<input
                			name="emailAddr"
                			type="email"
                			className="form-control"
                			placeholder="Email Address"
                			maxLength="255"
                			value={this.state.emailAddr}
                			onChange={this.handleChange}
                			required
                		/>
                		<ReCAPTCHA
                			ref={(e) => {this.captcha = e;}}
                			sitekey="6LcUOEAaAAAAAB7egsJshmpS-P92-xI62GTKJz9X"
                			onChange={this.onChange}
                		/>
                		<p style={{fontSize: '10px', color: 'red'}}>I acknowledge that I am over age 21</p>
                		<Button variant="contained" onClick={this.handleSubmit}>Send</Button>
                	</form>
                );
		} else {
			emailOk = <div><strong>Invite in queue #{this.state.marker}</strong></div>;
		}


		return (
			<section className="invitePending" style={this.style}>
				<div className="name-details">
					<form onSubmit={this.handleSubmit}>
						<p>
                            Enter your email for a personal invitation to discover and review products from <strong>{this.state.slug}</strong>
						</p>
						<ul>
							<li>
								{this.props.game_name}
							</li>
							<li>
								<em>{this.props.game_description}</em>
							</li>
						</ul>
						<MessageBoardId />
						<div id="email-details">{emailOk}</div>
					</form>
				</div>
			</section>
		);
	}
}

InviteBlog.propTypes = {
	onMessage: PropTypes.func,
	slug: PropTypes.string,
	game_description: PropTypes.string,
	game_name: PropTypes.string,
	game_id: PropTypes.string,
};

InviteBlog.defaultProps = {
	onMessage: PropTypes.func,
};

export default withRouter(InviteBlog);
