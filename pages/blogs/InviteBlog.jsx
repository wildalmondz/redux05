import React, { useState, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { v4 } from 'uuid';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import {setMessage} from "../../src/redux/features/messageSlice";

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

function sendIt (game_id, game_name, email, count, token) {
	count++;
	let userId = v4();
	let emailId = v4();
	let inviteId = v4();
	let newsMessage = 'WildAlmonds';

	console.log('Game ID here in sendIt!!! ' + game_id);
	// POST /invited/writeInviteUser/e11ad6af-0630-453f-bc43-8894e317f9af//Bookwalter%20Wines/threeAdmin@wildalmondstest.com/58ea9c91-7bfe-4008-b546-f0957f6a52a9/64ab364c-2105-4f5b-8f45-90a30047f408/threeAdmin@wildalmondstest.com 404 2.455 ms - 356


	return new Promise((resolve, reject) => {
		const err = 'Error!';


		axios.post(`http://localhost:4500/blog/subscribe/${token}`)
			.then((response) => {
				if (response.data.success === true) {
					axios.post(`http://localhost:4500/invited/writeInviteUser/${userId}/${game_id}/${game_name}/${email}/${emailId}/${inviteId}/${email}`)
						.then((response) => {
							if (response.data !== 'undefined') {
								// alert(response.data);
								console.log('Response Data: [' + JSON.stringify(response.data) + ' ]');
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

								//sendMessage(newsMessage);
								newsMessage = '';

								setTimeout(() => {
									//return sendMessage('');
									return;
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

const setCaptchaRef = (ref) => {
	if (ref) {
		return captcha = ref;
	}
};

const InviteBlog = ({urlParse}) => {

	const [token, setToken] = useState(''); // State for managing likes
	const [email, setEmail] = useState('');

	const [game_id, setGameId] = useState('');
	const [game_name, setGameName] = useState('');
	const [game_description, setGameDescription] = useState('');

	const [eventData, setEventData] = useState('');



	const onChange = (value) => {
			setToken(value);
	}

	useEffect(() => {
	const fetchCollectionData = async () => {
		if (urlParse && urlParse.slug) {
			try {
				// Fetch data using tournament_id
				const blogResponse = await fetch(`http://localhost:4500/games/counterblog_v2/${urlParse.slug}`, {

				});

				const returnedData = await blogResponse.json();

				// alert(JSON.stringify(returnedData));
				setEventData(returnedData); // Assuming you only have one item in the array
				setGameId(returnedData[0].game_id);
				setGameName(returnedData[0].game_name);
				setGameDescription(returnedData[0].game_description);
			} catch (error) {
				console.error('Error fetching data:', error.message);
			}
		}
	};

	fetchCollectionData();
	}, []); // Empty dependency array means this effect runs once on mount

	const handleInputChange = (e) => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		let clientError = false;

		if (clientError != true) {

			if (name === 'email') {
				console.log(value);
				setEmail(value);
			}
		}
	};

	const handleSubmit = () => {
		alert('Hello submit' + email + ' slug => ' + urlParse.slug +
			' gameId: ' + game_id +
			' gameName: ' + game_name +
			' gameDescription: ' + game_description
		);
		resetCaptcha();
		promises.push(urlEncode2('eventname', game_name));
		promises.push(sendIt(
			game_id,
			game_name,
			email,
			count,
			token));

		Promise.all(promises)
			.then((result) => {
				console.log('Result:' + JSON.stringify(result));
				promises = [];
				allNew = [];
			});


		/*
		promises.push(sendIt(
			this.props.game_id,
			this.props.game_name,
			email,
			count,
			this.state.token,
			this.props.onMessage));

		this.setState({
			emailAddr: '',
			token: null,
		});



		/*
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
		 */

	};

	return (
		<>
				<h4>Get your invitation here</h4>
					<TextField
						style={{ backgroundColor: 'white', maxWidth: '400px' }}
						required
						id="outlined-basic"
						label="Email Address"
						name="email"
						variant="outlined"
						size="small" // Set the size to small
						fullWidth // Make the input take the full width
						onChange={handleInputChange}
					/>
				<Grid container alignItems="center" justifyContent="center" style={{ height: '100%' }}>


					{/* First Box */}
					<Grid item>
						<div style={{ padding: '2px', margin: '2px' }}>
							<Grid item xs={8}>
								<Button variant="contained" onClick={handleSubmit}>
									Send
								</Button>
							</Grid>
						</div>
					</Grid>
					{/* Second Box */}
					<Grid item>
						<div style={{padding: '2px', margin: '2px' }}>
								<div className="captcha" style={{transform:"scale(0.73)", transformOrigin:"0 0"}}>
									<ReCAPTCHA
										ref={(r) => setCaptchaRef(r) }
										size="compact" // Set the size to compact
										sitekey="6LcUOEAaAAAAAB7egsJshmpS-P92-xI62GTKJz9X"
										onChange={onChange}
									/>
								</div>
						</div>
					</Grid>
				</Grid>
		</>
	);
};


export default InviteBlog;

	/*
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

	 */
							{/* Email Input */}
/*
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

 */
							{/* Send Button */}

/*
							<Grid item xs={8}>
									<Button variant="contained" onClick={this.handleSubmit}>
										Send
									</Button>
							</Grid>

 */
							{/* reCAPTCHA */}
/*
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
/*

/*

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

*/


