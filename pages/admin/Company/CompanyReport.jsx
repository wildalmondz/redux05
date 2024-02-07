import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Company/stylesheet/CompanyReport.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {confirmAlert} from 'react-confirm-alert';
import UploadAndDisplayImage from '../Experience/UploadAndDisplayImage.jsx';

let completed = false;
let allNew = [];
let promises = [];

function redirectMe(squareUrl) {
	window.open(`${squareUrl}`);
}

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

	return(
		<div id="textfield">
			<TextField
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

class CompanyReport extends Component {
	constructor(props) {
		super(props);
		this.state = {
			company: this.props.companyDetails,
			company_name: '',
			type: '',
			company_domain: '',
			slug: '',
			email: '',
			phone_number: '',
			street_address: '',
			city: '',
			state: '',
			postal_code: '',
			company_image: '',
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleClear = this.handleClear.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	// https://medium.com/hackernoon/replacing-componentwillreceiveprops-with-getderivedstatefromprops-c3956f7ce607
	/*
	static getDerivedStateFromProps(props, state) {
		if(props.companyDetails !== state.company){
			//Change in props
			alert('Here!');
			alert(JSON.stringify(props.companyDetails));
			if (props.companyDetails[0]) {
				return {
					id: props.companyDetails[0].id,
					company_name: props.companyDetails[0].name,
					type: props.companyDetails[0].type,
					company_domain: props.companyDetails[0].company_domain,
					slug: props.companyDetails[0].slug,
					email: props.companyDetails[0].email,
					phone_number: props.companyDetails[0].phone_number,
					street_address: props.companyDetails[0].street_address,
					city: props.companyDetails[0].city,
					state: props.companyDetails[0].state,
					postal_code: props.companyDetails[0].postal_code,
					company_image: props.companyDetails[0].company_image
				};
			}
		}
		return null; // No change to state
	}
    */

	componentWillReceiveProps(props) {
		this.setState({
			id: null,
			company_name: '',
			type: '',
			company_domain: '',
			slug: '',
			email: '',
			phone_number: '',
			street_address: '',
			city: '',
			state: '',
			postal_code: '',
			company_image: '',
		});


		if (props.companyDetails[0]){
			this.setState({
				id: props.companyDetails[0].id,
				company_name: props.companyDetails[0].name,
				type: props.companyDetails[0].type,
				company_domain: props.companyDetails[0].company_domain,
				slug: props.companyDetails[0].slug,
				email: props.companyDetails[0].email,
				phone_number: props.companyDetails[0].phone_number,
				street_address: props.companyDetails[0].street_address,
				city: props.companyDetails[0].city,
				state: props.companyDetails[0].state,
				postal_code: props.companyDetails[0].postal_code,
				company_image: props.companyDetails[0].company_image
			});
		}


	}

	handleInputChange(event) {
		event.preventDefault();
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		// alert('name' + name + ' ' + value);

		this.setState({
			[name]: value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		const sendMessage = this.props.onMessage;
		let existing;

		promises.push(urlEncode2('name', this.state.company_name));
		promises.push(urlEncode2('type', this.state.type));
		promises.push(urlEncode2('domain', this.state.company_domain));
		promises.push(urlEncode2('slug', this.state.slug));
		promises.push(urlEncode2('email', this.state.email));
		promises.push(urlEncode2('phone_number', this.state.phone_number));
		promises.push(urlEncode2('street_address', this.state.street_address));
		promises.push(urlEncode2('city', this.state.city));
		promises.push(urlEncode2('state', this.state.state));
		promises.push(urlEncode2('postal_code', this.state.postal_code));
		promises.push(urlEncode2('postal_code', this.state.company_image));

		Promise.all(promises)
			.then((result) => {
				completed = result;
				promises = [];
			});

		if ((this.state.id == undefined) || (this.state.id === '') || this.state.id === null) {  // brand new company

			if ((this.state.company_name === '') ||
				(this.state.company_name === undefined) ||
				(this.state.company_name == null)) {
				confirmAlert({
					title: 'Company Name Required',
					message: 'Please enter a unique company name',
					buttons: [ { label: 'Ok', onClick: () => { return; },},],
				});
			} else {
				this.props.onCreateCompany(
					'null',
					this.state.company_name,
					this.state.type,
					this.state.company_domain,
					this.state.slug,
					this.state.email,
					this.state.phone_number,
					this.state.street_address,
					this.state.city,
					this.state.state,
					this.state.postal_code,
					this.state.company_image);

				allNew = [];

				sendMessage(`Created: ${this.state.company_name}`);
				delay(sendMessage, 'Created ', this.state.company_name)
					.then(function (v) { // `delay` returns a promise
						return sendMessage(v);
					});
			}
		}
		else { // existing company update
			existing = true;
			this.props.onUpdateCompany(
				this.state.id,
				this.state.company_name,
				this.state.type,
				this.state.company_domain,
				this.state.slug,
				this.state.email,
				this.state.phone_number,
				this.state.street_address,
				this.state.city,
				this.state.state,
				this.state.postal_code,
				this.state.company_image);

			delay(sendMessage, 'Updated ', this.state.company_name)
				.then(function(v) { // `delay` returns a promise
					return sendMessage(v);
				});
		}
		allNew = [];

		if (existing === false){
			sendMessage(`Created!: ${this.state.company_name}`);
			delay(sendMessage, 'Created ', this.state.company_name)
				.then(function(v) { // `delay` returns a promise
					return sendMessage(v);
				});
		}
		else if (existing == true) {
			sendMessage(`Updated!: ${this.state.company_name}`);
			delay(sendMessage, 'Created ', this.state.company_name)
				.then(function(v) { // `delay` returns a promise
					return sendMessage(v);
				});
		}
	}

	handleClear(event) {
		event.preventDefault();
		confirmAlert({
			title: 'Reset Form',
			message: 'This will clear form data. Are you sure?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						redirectMe('/Admin/company');},
				},
				{
					label: 'No',
					onClick: () => {},
				},
			],
		});
	}

	render() {
		const {
			companyDetails,
		} = this.props;
		return (
			<section id="adminPage">
				<section id="companyEntities">
					<div className="flex-parent-element">
						<div className='flex-child-element green'>
							<TextInput
								required
								props={this.props}
								label="Company Name"
								name="company_name"
								value={this.state.company_name}
								onChange={this.handleInputChange}
							/>
							<br />
							<TextInput
								props={this.props}
								label="Phone Number"
								name="phone_number"
								value={this.state.phone_number}
								onChange={this.handleInputChange}
							/>
							<br />
							<TextInput
								props={this.props}
								label="Street Address"
								name="street_address"
								value={this.state.street_address}
								onChange={this.handleInputChange}
							/>
							<br />
							<TextInput
								props={this.props}
								label="City"
								name="city"
								value={this.state.city}
								onChange={this.handleInputChange}
							/>
							<br />
							<TextInput
								props={this.props}
								label="State"
								name="state"
								value={this.state.state}
								onChange={this.handleInputChange}
							/>
							<br />
							<TextInput
								props={this.props}
								label="Zip Code"
								name="postal_code"
								value={this.state.postal_code}
								onChange={this.handleInputChange}
							/>
						</div>
						<div className="flex-child-element magenta">
							<TextInput
								props={this.props}
								label="Company Type"
								name="type"
								value={this.state.type}
								onChange={this.handleInputChange}
							/>
							<br />
							<TextInput
								props={this.props}
								label="Slug"
								name="slug"
								value={this.state.slug}
								onChange={this.handleInputChange}
							/>
							<br />
							<TextInput
								props={this.props}
								label="Email"
								name="email"
								value={this.state.email}
								onChange={this.handleInputChange}
							/>
							<br />
							<TextInput
								props={this.props}
								label="Company Domain"
								name="company_domain"
								value={this.state.company_domain}
								onChange={this.handleInputChange}
							/>
							<br />
							<TextInput
								props={this.props}
								label="Image Path"
								name="image_path"
								value={this.state.image_path}
								onChange={this.handleInputChange}
							/>
							<br />
							<UploadAndDisplayImage />
							<br />
							<br />
							<img id="companyimage"
								src={'https://wildalmonds.com/api/uploads/2a432b2a-5862-46ca-adcf-eac67a0c20ab_wildAlmondsLogo.jpeg'}
								alt="Web"
								width="200"
								height="200"
								onClick={() => alert('hello world')}
								// onMouseOver={() => redirectMe(props.urlPath)}
							/>
							<br />
						</div>
					</div>
				</section>
				<section id="admin">
					<div id="companyValues">
						<div id="buttonGroup" >
							<div className="flex-parent-element">
								<div className="flex-child-element magenta">
									Id : {this.state.id}
								</div>
								<div className="flex-child-element green">
									<Button variant="contained" onClick={this.handleClear}>Reset</Button>
									<a>  </a>
									<Button variant="contained" onClick={this.handleSubmit}>Submit</Button>
								</div>
							</div>
						</div>
					</div>
				</section>
			</section>
		);
	}
}

CompanyReport.propTypes = {
	companyDetails: PropTypes.array,
	onCreateCompany: PropTypes.func,
	onUpdateCompany: PropTypes.func,
	onMessage: PropTypes.func,
};

CompanyReport.defaultProps = {
	onCreateCompany: f => f,
	onUpdateCompany: f => f,
	onMessage: f => f,
};

export default CompanyReport;