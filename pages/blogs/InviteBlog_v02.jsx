import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { withRouter } from 'react-router';
import ReCAPTCHA from 'react-google-recaptcha';
import { v4 } from 'uuid';
import axios from 'axios';
// import './stylesheet/InvitePendingForm.scss';
// import { MessageBoardId } from '../main/lib/containers.js';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

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

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: '0em',
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));


let captcha;

const resetCaptcha = () => {
	setTimeout(() => { // Brute force fix if user hits refresh
		captcha.reset();
	}, 750);
}


function onChange(value) {
	console.log("Captcha value:", value);
	resetCaptcha();
}

const setCaptchaRef = (ref) => {
	if (ref) {
		return captcha = ref;
	}
};


class InviteBlog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// slug: this.props.match.params.slugName,
			slug: 'chicken',
			emailAddr: '',
			token: null,
			marker: 1,
		};

		this.state.slug = this.capitalizeSlug(this.state.slug);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChange = this.onChange.bind(this);

	}

	capitalizeSlug(slug) {
		return slug.charAt(0).toUpperCase() + slug.slice(1);
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

                	</form>
                );
		} else {
			emailOk = <div><strong>Invite in queue #{this.state.marker}</strong></div>;
		}



		return (
			<section style={{height: '95%' }}>
				<div>
						<Grid container spacing={0.5}>
							{/* Email Input */}
							<Grid item xs={12} sm={6} >
								<Item>
									<TextField
										style={{ backgroundColor: 'white' }}
										required
										id="outlined-basic"
										label="Email Address"
										variant="outlined"
										size="small" // Set the size to small
										fullWidth // Make the input take the full width
									/>
								</Item>
							</Grid>
							{/* Send Button */}
							<Grid item xs={8}>
									<Button variant="contained" onClick={this.handleSubmit}>
										Send
									</Button>
							</Grid>
							{/* reCAPTCHA */}
							<Grid item xs={8} sm={6} sx={{height: 25, width: 99}}>
									<div className="captcha" style={{transform:"scale(0.73)", transformOrigin:"0 0"}}>
										<ReCAPTCHA
											ref={(r) => setCaptchaRef(r) }
											size="compact" // Set the size to compact
											sitekey="6LcUOEAaAAAAAB7egsJshmpS-P92-xI62GTKJz9X"
											onChange={onChange}
										/>
									</div>
							</Grid>
						</Grid>
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

export default InviteBlog;
