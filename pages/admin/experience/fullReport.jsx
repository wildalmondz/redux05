import React, { useState, useEffect } from 'react';
import {styled} from "@mui/material/styles";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import TabPanels from './Tabs';

let completed = false;
let allNew = [];
let promises = [];

const currencies = [
	{
		value: 'USD',
		label: '$',
	},
	{
		value: 'EUR',
		label: '€',
	},
	{
		value: 'BTC',
		label: '฿',
	},
	{
		value: 'JPY',
		label: '¥',
	},
];

const AdminPage = styled('div')({
	display: 'flex',
	height: '4vw',
	position: 'initial',
	paddingBottom: '3em',
})

const TourneyReport = ({
					   }) => {
	const [id, setId] = useState(false);
	const [name, setName] = useState(false);
	const [tournament, setTournament] = useState('');
	const [tournament_id, setTournament_id] = useState('');
	const [tournament_name, setTournament_name] = useState('');
	const [tournament_description, setTournament_description] = useState('');
	const [almond_count, setAlmond_count] = useState('');
	const [square_count, setSquare_count] = useState('');
	const [tournament_status, setTournament_status] = useState('');
	const [tournament_restriction, setTournament_restriction] = useState('');
	const [expires, setExpires] = useState('');
	const [expired_status, setExpired_status] = useState('');
	const [company_image, setCompany_image] = useState('');

	const handleInputChange = (e) => {
		const target = e.target;
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
	};

	const handleSubmit = (e) => {
		//const sendMessage = this.props.onMessage;
		let existing;
		let writeExpires;

		if (expires != null) {
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

			alert('Tournament Name Required');

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
			this.props.onUpdateTourney(
				this.state.tournament_id,
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

	return (
		<div style={{ width: '100%' }}>
			<AdminPage>
				<Box
					component="form"
					sx={{
						'& > :not(style)': { m: 1, width: '25ch' },
					}}
					noValidate
					autoComplete="off"
				>
					<div>
						<TextField
							style={{minWidth: '15em'}}
							id="outlined-select-currency"
							select
							label="Group/company"
							defaultValue="EUR"
							helperText="Select a group"
						>
							{currencies.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
						<div className="flex-parent-element">
							<div className="flex-child-element green">
								<TextField
									style={{minWidth: '15em'}}
									required={true}
									select
									label="Tournament Name"
									name="tournament_name"
									value={tournament_name}
									onChange={handleInputChange}
								/>
								<br />
								<TextField
									style={{minWidth: '15em'}}
									fullWidth
									id="outlined-multiline-flexible"
									label="Description"
									name="tournament_description"
									multiline
									rows={4}
									defaultValue="Tournament Description"
									value={tournament_description}
									onChange={handleInputChange}
								/>
								<br />
								<br />
								<TextField
									style={{minWidth: '15em'}}
									disabled
									id="outlined-number"
									label="Square Count"
									name="square_count"
									type="number"
									value={square_count}
									InputLabelProps={{
										shrink: true,
									}}
								/>
								<br />
								<TextField
									style={{minWidth: '15em'}}
									required={true}
									label="Almond Count"
									name="almond_count"
									value={almond_count}
									onChange={handleInputChange}
								/>
								<br />
							</div>
						</div>
						<TabPanels />
					</div>
				</Box>
			</AdminPage>
		</div>
	);
};

export default TourneyReport;