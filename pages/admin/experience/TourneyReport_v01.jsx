import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../Company/stylesheet/CompanyReport.scss';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import {confirmAlert} from 'react-confirm-alert';
//import {AdminGames} from './containers.js';
// import {GamesReportId} from '../../main/lib/containers.js';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from  '@mui/material/FormControlLabel';

let completed = false;
let allNew = [];
let promises = [];

function delay(sendMessage, message, addOn) {
	// `delay` returns a promise
	const toSend = (`${message} ${addOn}`);

	return new Promise(function(resolve, reject) {
		// Only `delay` is able to resolve or reject the promise
		setTimeout(function() {
			sendMessage(toSend);
			resolve('');
		}, 4000);
	});
}

function urlEncode2(name, userQuery) {
	return new Promise((resolve, reject) => {
		let res = encodeURIComponent(userQuery);
		res = res.replace(/[/]/g, '%2F')
			.replace(/[?]/g, '%3F')
			.replace(/[#]/g, '%23')
			.replace(/'/g, '%27');

		const newVal = res;
		resolve(newVal);
		reject(err);
		allNew.push({ name: newVal });
	});
}

function TextInput(props) {
	const curLabel = props.label;
	const curName = props.name;
	const required = props.required;
	const multiline = props.multiline;

	return(
		<div id="textfield">
			<TextField
				required={required}
				multiline={multiline}
				fullWidth
				id="outlined-basic"
				label={curLabel}
				name={curName}
				maxLength="400"
				variant="standard"
				value={props.value}
				onChange={props.onChange}
			/>
		</div>
	);
}

function formatDate(dbDate) {
	if (dbDate !== null) {
		return (dbDate.slice(0,16));
	}
	else {
		return dbDate;
	}
}

const TourneyReport = ({
					   }) => {
	const [editChange, setEditChange] = useState(false);


	return (
		<div style={{ width: '100%' }}>
			<h4>Admin Experience</h4>
		</div>
	);

};

export default TourneyReport;


	/*
class TourneyReport extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: false,
			name: false,
			tournament: '',
			tournament_id: '',
			tournament_name: '',
			tournament_description: '',
			almond_count: '',
			square_count: '',
			tournament_status: '',
			tournament_restriction: '',
			expires: '',
			expired_status: '',
			company_image: '',
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.setState({
			tournament: '',
			newTournament: false,
			id: null,
			tournament_name: '',
			tournament_description: '',
			tournament_restriction: '',
			almond_count: '',
			tournament_status: '',
			square_count: '',
			expires: '',
			expired_status: '',
		});
	}

	componentWillUnmount() {
	}

	componentWillReceiveProps(props) {
		this.setState({
			tournament: props.admintournament,
			newTournament: false,
			id: null,
			age: '',
			tournament_id: '',
			tournament_name: '',
			tournament_description: '',
			tournament_restriction: '',
			almond_count: 0,
			tournament_status: '',
			square_count: 0,
			expires: '',
			expired_status: '',
		});


		if ((props.admintournament) &&
			(props.admintournament[0]) &&
			(props.admintournament[0].tournament_status))
		{
			this.setState({
				tournament_id: props.admintournament[0].tournament_id,
				tournament_name: props.admintournament[0].tournament_name,
				tournament_description: props.admintournament[0].tournament_description,
				almond_count: props.admintournament[0].almond_count,
				square_count: props.admintournament[0].square_count,
				tournament_status: props.admintournament[0].tournament_status,
				tournament_restriction: props.admintournament[0].tournament_restriction,
				expires: formatDate(props.admintournament[0].expires),
				// expires: '2023-03-24T13:16',
				expired_status: props.admintournament[0].expired_status,
			});
		}

		if ((props.companyDetails) && (props.companyDetails[0]) && (props.companyDetails[0].name)){

			this.setState({
				id: props.companyDetails[0].id,
				name: props.companyDetails[0].name,
				// type: props.companyDetails[0].type,
				// slug: props.companyDetails[0].slug,
			});
		}

	}

	handleInputChange(event) {
		event.preventDefault();
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		let clientError = false;

		if (name === 'almond_count') {
			if ((this.state.square_count === undefined) || (value > this.state.square_count)) {
				alert(this.state.almond_count + 'Almond count [' + value + '] cannot exceed square count of [' + this.state.square_count + ']');

				this.setState({
					[name]: this.state.almond_count,
				});
				clientError = true;
			}
		}
		
		if (name === 'square_count') {
			if (value < this.state.almond_count) {
				alert('Square count [' + value + '] cannot be less than Almond count of [' + this.state.almond_count + ']');
			}
		}

		if (name === 'expires') {
			// alert('Expires [' + value + ']');
		}

		if (clientError != true) {
			// alert(name + ' | ' + value);
			this.setState({
				[name]: value,
			});
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		const sendMessage = this.props.onMessage;
		let existing;
		let writeExpires;

		if (this.state.expires !== null) {
			writeExpires = this.state.expires + ':00.00';
		}
		else {
			writeExpires = null;
		}

		promises.push(urlEncode2('name', this.state.tournament_name));
		promises.push(urlEncode2('tournament_description', this.state.tournament_description));
		promises.push(urlEncode2('tournament_status', this.state.tournament_status));
		promises.push(urlEncode2('tournament_tournament_restriction', this.state.tournament_restriction));
		promises.push(urlEncode2('almond_count', this.state.almond_count));
		promises.push(urlEncode2('square_count', this.state.square_count));
		// promises.push(urlEncode2('expires', this.state.expires));
		promises.push(urlEncode2('expired_status', this.state.expired_status));

		Promise.all(promises)
			.then((result) => {
				completed = result;
				promises = [];
			});

		if ((this.state.tournament_id == undefined) || (this.state.tournament_id === '') || this.state.tournament_id === null) {  // brand new company

			if ((this.state.square_count === '') || (this.state.square_count === null)){
				this.setState({
					square_count: this.state.almond_count,
				});
			}

			if ((this.state.tournament_name === '') ||
				(this.state.tournament_name === undefined) ||
				(this.state.tournament_name == null)) {
				/*
				confirmAlert({
					title: 'Tournament Name Required',
					message: 'Please enter a unique tournament name',
					buttons: [ { label: 'Ok', onClick: () => { return; },},],
				});

			} else {
				this.props.onCreateTourney(
					'null',
					this.state.tournament_name,
					this.state.tournament_description,
					this.state.tournament_restriction,
					this.state.almond_count,
					this.state.tournament_status,
					this.state.square_count,
					writeExpires,
					this.state.expired_status,
					this.state.id);

				allNew = [];

				sendMessage(`Created: ${this.state.tournament_name}`);
				delay(sendMessage, 'Created ', this.state.tournament_name)
					.then(function (v) { // `delay` returns a promise
						return sendMessage(v);
					});
			}
		}
		else { // existing company update
			existing = true;
			this.props.onUpdateTourney(this.state.tournament_id,
				this.state.tournament_name,
				this.state.tournament_description,
				this.state.tournament_restriction,
				this.state.almond_count,
				this.state.tournament_status,
				this.state.square_count,
				writeExpires,
				this.state.expired_status,
				this.state.id);

			delay(sendMessage, 'Updated Tournament ', this.state.tournament_name)
				.then(function(v) { // `delay` returns a promise
					return sendMessage(v);
				});
		}
		allNew = [];

		if (existing === false){
			sendMessage(`Created tournament: ${this.state.tournament_name}`);
			delay(sendMessage, 'Created tournament', this.state.tournament_name)
				.then(function(v) { // `delay` returns a promise
					return sendMessage(v);
				});
		}
		else if (existing == true) {
			sendMessage(`Updated!: ${this.state.tournament_name}`);
			delay(sendMessage, 'Created ', this.state.tournament_name)
				.then(function(v) { // `delay` returns a promise
					return sendMessage(v);
				});
		}
	}
		<FormHelperText>Time Expire Set</FormHelperText>

	render() {
		return (
			<section id="adminPage">
				{(this.state.name === false) ?
					<div>Select a company</div>
					:
					<section id="companyEntities">
						<span><strong>{this.state.id}</strong></span>
						<span><strong>{this.state.name}</strong></span>
						<form noValidate>
							<FormControl style={{width: '100%'}}>
								<div className="flex-parent-element">
									<div className="flex-child-element green">
										<TextInput
											required={true}
											props={this.props}
											label="Tournament Name"
											name="tournament_name"
											value={this.state.tournament_name}
											onChange={this.handleInputChange}
										/>
										<br />
										<TextField
											fullWidth
											id="outlined-multiline-flexible"
											label="Description"
											name="tournament_description"
											multiline
											rows={4}
											defaultValue="Tournament Description"
											value={this.state.tournament_description}
											onChange={this.handleInputChange}
										/>
										<br />
										<br />
										<TextField
											disabled
											id="outlined-number"
											label="Square Count"
											name="square_count"
											type="number"
											value={this.state.square_count}
											InputLabelProps={{
												shrink: true,
											}}
										/>
										<br />
										<TextInput
											required={true}
											props={this.props}
											label="Almond Count"
											name="almond_count"
											value={this.state.almond_count}
											onChange={this.handleInputChange}
										/>
										<br />
									</div>
									<div className="flex-child-element magenta">
										<br />
										<FormControl sx={{ m: 1, minWidth: 120 }}>
											<FormLabel id="demo-controlled-radio-buttons-group">Status</FormLabel>
											<RadioGroup
												row
												aria-labelledby="demo-controlled-radio-buttons-group"
												name="tournament_status"
												value={this.state.tournament_status}
												onChange={this.handleInputChange}
											>
												<FormControlLabel value="active" control={<Radio />} label="active" />
												<FormControlLabel value="inactive" control={<Radio />} label="inactive" />
											</RadioGroup>
										</FormControl>
										<br />
										<FormControl sx={{ m: 1, minWidth: 120 }}>
											<FormLabel id="demo-controlled-radio-buttons-group">Expired Status</FormLabel>
											<RadioGroup
												row
												aria-labelledby="demo-controlled-radio-buttons-group"
												name="expired_status"
												value={this.state.expired_status}
												onChange={this.handleInputChange}
											>
												<FormControlLabel value="active" control={<Radio />} label="active" />
												<FormControlLabel value="inactive" control={<Radio />} label="inactive" />
											</RadioGroup>
										</FormControl>
										<br />
										<FormControl sx={{ m: 1, minWidth: 120 }}>
											<FormLabel id="demo-controlled-radio-buttons-group">Accessibility</FormLabel>
											<RadioGroup
												row
												aria-labelledby="demo-controlled-radio-buttons-group"
												name="tournament_restriction"
												value={this.state.tournament_restriction}
												onChange={this.handleInputChange}
											>
												<FormControlLabel value="private" control={<Radio />} label="private" />
												<FormControlLabel value="public" control={<Radio />} label="public" />
											</RadioGroup>
										</FormControl>
										<br />
										<p>{this.state.expires}</p>
										<TextField
											id="datetime-local"
											label="Expires"
											type="datetime-local"
											name="expires"
											defaultValue="2023-03-24T13:16"
											value={this.state.expires}
											onChange={this.handleInputChange}
											InputLabelProps={{
												shrink: true,
											}}
										/>
										<br />
										<img id="companyimage"
											src={'https://wildalmonds.com/api/uploads/2a432b2a-5862-46ca-adcf-eac67a0c20ab_wildAlmondsLogo.jpeg'}
											alt="Web"
											width="200"
											height="200"
											// onClick={() => alert('hello world')}
											// onMouseOver={() => redirectMe(props.urlPath)}
										/>
										<br />
									</div>
								</div>
							</FormControl>
						</form>
						<div id="companyValues">
							<div id="buttonGroup" >
								<div className="flex-parent-element">
									<div className="flex-child-element magenta">
									Id : {this.state.tournament_id}
									</div>
									<div className="flex-child-element green">
										<Button variant="contained" onClick={this.handleSubmit}>Submit</Button>
									</div>
								</div>
							</div>
						</div>
					</section>
				}
			</section>
		);
	}
}

TourneyReport.propTypes = {
	companyDetails: PropTypes.array,
	admintournament: PropTypes.array,
	onCreateTourney: PropTypes.func,
	onUpdateTourney: PropTypes.func,
	onMessage: PropTypes.func,
};

TourneyReport.defaultProps = {
	onCreateTourney: f => f,
	onUpdateTourney: f => f,
	onMessage: f => f,
};

export default TourneyReport;
*/