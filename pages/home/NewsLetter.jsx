import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import Button from '@mui/material/Button';
import axios from 'axios';
import styles from '../../styles/NewsLetter.module.css'
import Grid from '@mui/material/Grid'; // Import Grid from Material-UI
// import { MessageBoardId } from './lib/containers.js';

let allNew = [];
let promises = [];
let count = 0;
const timeWait = 1200;
const messageWait = 3200;

function sendIt (email, count, token, sendMessage) {
	count++;

	let newsMessage = 'WildAlmonds';

	return new Promise((resolve, reject) => {
		const err = 'Error!';

		axios.post(`http://localhost:4500/apidev/subscribe/${token}`)
			.then((response) => {
				if (response.data.success === true) {
					axios.post(`http://localhost:4500/apidev/newsletter/${email}`)
						.then((response) => {
							if (response.data !== 'undefined') {
								if (/^ER_DUP_ENTRY/.test(response.data.code)) {
									newsMessage = `Email Address ${email} is currently a newsletter subscriber`;
								} else if (response.data.affectedRows === 1){
									newsMessage = `Thank you. ${email} has been added!`;
								}
							}
						}).then(() => {
							sendMessage(newsMessage);
							newsMessage = '';
							setTimeout(() => {
								return sendMessage('');
							}, messageWait);
						}).catch((error) => {
							console.log(error);
						});
				}
			});

		resolve(count);
		reject(err);
	});
}

class NewsLetter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emailAddr: '',
			token: null,
			marker: 1,
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	onChange(value) {
		this.setState({
			token: value
		});
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		this.captcha.reset();
		this.setState({
			emailAddr: '',
		});

		const sendMessage = this.props.onMessage;
		let newsMessage = '';

		if (this.state.token === null) {
			newsMessage = 'Please check ReCAPTCHA';
			sendMessage(newsMessage);
			setTimeout(() => {
				return sendMessage('');
			}, messageWait);
		}

		promises.push(sendIt(
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

	componentDidMount() {
	}

	componentWillUnmount() {
		if (this._asyncRequest) {
			this._asyncRequest.cancel();
		}
	}
	render() {
		let emailOk;
		if (this.state.marker) {
			emailOk = (
				<Grid container spacing={2}> {/* Use Grid container to create a grid */}
					<Grid item xs={12} md={6}> {/* First Grid item for the form */}
						<form onSubmit={this.handleSubmit}>
							<input
								name="emailAddr"
								type="email"
								className="form-control"
								placeholder="Email Address"
								maxLength="255"
								value={this.state.emailAddr}
								onChange={this.handleInputChange}
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
					</Grid>
					<Grid item xs={12} md={6}> {/* Second Grid item for the section after the button */}
						<section className={styles.logo}>
						</section>
					</Grid>
				</Grid>
			);
		} else {
			emailOk = <div><strong>Invite in queue #{this.state.marker}</strong></div>;
		}

		return (
			<div id="newsletter">
				<div id="messageboard">
					{/* ... (content of the messageboard) */}
				</div>
				<div>
					<label style={{ color: '#683761', fontSize: '1.5em' }}>
						<strong>Sign up for the WildAlmonds newsletter</strong>
						<div id="email-details">{emailOk}</div>
					</label>
				</div>
			</div>
		);
	}
}

NewsLetter.propTypes = {
	onMessage: PropTypes.func,
};

NewsLetter.defaultProps = {
	onMessage: f => f,
};

export default NewsLetter;
