import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Company/stylesheet/CompanyReport.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {confirmAlert} from 'react-confirm-alert';

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
			resolve('WildAlmonds');
		}, 4000);
	});
}

function phonenumber(number)
{
	var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	if(number.value.match(phoneno))
	{
		return true;
	}
	else
	{
		alert('Not a valid Phone Number');
		return false;
	}
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

class ProductReport extends Component {
	constructor(props) {
		super(props);
		this.state = {
			product: this.props.productDetails,
			square_id: '',
			event_id: '',
			image_id: '',
			square_name: '',
			square_description:'',
			square_division: '',
			square_rank: '',
			square_url: '',
			child_id: '',
			square_status: '',
			image_path: '',
			reserve_url: '',
			map_url: '',
			video_url: '',
			isAd: '',
			ad_status: '',
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleClear = this.handleClear.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(props) {
		this.setState({
			square_id: null,
			event_id: '',
			image_id: '',
			square_name: '',
			square_description: '',
			square_division: '',
			square_rank: '',
			square_url: '',
			child_id: '',
			square_status: '',
			image_path: '',
			reserve_url: '',
			map_url: '',
			video_url: '',
			isAd: '',
			ad_status: '',
		});


		if (props.productDetails[0]){
			this.setState({
				square_id: props.productDetails[0].square_id,
				event_id: props.productDetails[0].event_id,
				image_id: props.productDetails[0].image_id,
				square_name: props.productDetails[0].square_name,
				square_description: props.productDetails[0].square_description,
				square_division: props.productDetails[0].square_division,
				square_rank: props.productDetails[0].square_rank,
				square_url: props.productDetails[0].square_url,
				child_id: props.productDetails[0].child_id,
				square_status: props.productDetails[0].square_status,
				image_path: props.productDetails[0].image_path,
				reserve_url: props.productDetails[0].reserve_url,
				map_url: props.productDetails[0].map_url,
				video_url: props.productDetails[0].video_url,
				isAd: props.productDetails[0].isAd,
				ad_status: props.productDetails[0].ad_status,
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

		promises.push(urlEncode2('event_id', this.state.event_id));
		promises.push(urlEncode2('image_id', this.state.image_id));
		promises.push(urlEncode2('square_name', this.state.square_name));
		promises.push(urlEncode2('square_description', this.state.square_description));
		promises.push(urlEncode2('square_division', this.state.square_division));
		promises.push(urlEncode2('square_rank', this.state.square_rank));
		promises.push(urlEncode2('square_url', this.state.square_url));
		promises.push(urlEncode2('child_id', this.state.child_id));
		promises.push(urlEncode2('square_status', this.state.square_status));
		promises.push(urlEncode2('image_path', this.state.image_path));
		promises.push(urlEncode2('reserve_url', this.state.reserve_url));
		promises.push(urlEncode2('map_url', this.state.map_url));
		promises.push(urlEncode2('video_url', this.state.video_url));
		promises.push(urlEncode2('isAd', this.state.isAd));
		promises.push(urlEncode2('ad_status', this.state.ad_status));

		Promise.all(promises)
			.then((result) => {
				completed = result;
				promises = [];
			});

		if ((this.state.square_id == undefined) || (this.state.square_id === '') || this.state.square_id === null) {  // brand new product

			if ((this.state.square_name === '') ||
				(this.state.square_name === undefined) ||
				(this.state.square_name == null)) {
				confirmAlert({
					title: 'Product Name Required',
					message: 'Please enter a unique product name',
					buttons: [ { label: 'Ok', onClick: () => { return; },},],
				});
			} else {
				this.props.onCreateProduct(
					'null',
					this.state.event_id,
					this.state.image_id,
					this.state.square_name,
					this.state.square_description,
					this.state.square_division,
					this.state.square_rank,
					this.state.square_url,
					this.state.child_id,
					this.state.square_status,
					this.state.image_path,
					this.state.reserve_url,
					this.state.map_url,
					this.state.video_url,
					this.state.isAd,
					this.state.ad_status);

				allNew = [];

				sendMessage(`Created: ${this.state.square_name}`);
				delay(sendMessage, 'Created ', this.state.square_name)
					.then(function (v) { // `delay` returns a promise
						return sendMessage(v);
					});
			}
		}
		else { // existing product update
			existing = true;
			this.props.onUpdateProduct(
				this.state.square_id,
				this.state.event_id,
				this.state.image_id,
				this.state.square_name,
				this.state.square_description,
				this.state.square_division,
				this.state.square_rank,
				this.state.square_url,
				this.state.child_id,
				this.state.square_status,
				this.state.image_path,
				this.state.reserve_url,
				this.state.map_url,
				this.state.video_url,
				this.state.isAd,
				this.state.ad_status);

			delay(sendMessage, 'Updated ', this.state.square_name)
				.then(function(v) { // `delay` returns a promise
					return sendMessage(v);
				});
		}
		allNew = [];

		if (existing === false){
			sendMessage(`Created!: ${this.state.square_name}`);
			delay(sendMessage, 'Created ', this.state.square_name)
				.then(function(v) { // `delay` returns a promise
					return sendMessage(v);
				});
		}
		else if (existing == true) {
			sendMessage(`Updated!: ${this.state.square_name}`);
			delay(sendMessage, 'Created ', this.state.square_name)
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
						redirectMe('/Admin/product');},
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
			productDetails,
		} = this.props;
		return (
			<section id="adminPage">
				<section id="companyEntities">
					<div className="flex-parent-element">
						<div className="flex-child-element green">
							<TextInput
								required
								props={this.props}
								label="Square Name"
								name="square_name"
								value={this.state.square_name}
								onChange={this.handleInputChange}
							/>
							<br />
							<TextInput
								props={this.props}
								label="Square Description"
								name="square_description"
								value={this.state.square_description}
								onChange={this.handleInputChange}
							/>
							<br />
							<TextInput
								props={this.props}
								label="Square Division"
								name="square_division"
								value={this.state.square_division}
								onChange={this.handleInputChange}
							/>
							<br />
							<TextInput
								props={this.props}
								label="Square Rank"
								name="square_rank"
								value={this.state.square_rank}
								onChange={this.handleInputChange}
							/>
							<br />
							<TextInput
								props={this.props}
								label="Url"
								name="url"
								value={this.state.url}
								onChange={this.handleInputChange}
							/>
							<br />
							<TextInput
								props={this.props}
								label="Child Id"
								name="child_id"
								value={this.state.child_id}
								onChange={this.handleInputChange}
							/>
							<br />
							<TextInput
								props={this.props}
								label="Square Status"
								name="square_status"
								value={this.state.square_status}
								onChange={this.handleInputChange}
							/>
						</div>

						<div className="flex-child-element magenta">
							<TextInput
								props={this.props}
								label="Image Path"
								name="image_path"
								value={this.state.image_path}
								onChange={this.handleInputChange}
							/>
							<br />
							<TextInput
								props={this.props}
								label="Reservation URL"
								name="reserveUrl"
								value={this.state.reserve_url}
								onChange={this.handleInputChange}
							/>
							<br />
							<TextInput
								props={this.props}
								label="Map URL"
								name="map_url"
								value={this.state.map_url}
								onChange={this.handleInputChange}
							/>
							<br />
							<TextInput
								props={this.props}
								label="Video URL"
								name="video_url"
								value={this.state.video_url}
								onChange={this.handleInputChange}
							/>
							<TextInput
								props={this.props}
								label="Is Ad"
								name="isAd"
								value={this.state.isAd}
								onChange={this.handleInputChange}
							/>
							<TextInput
								props={this.props}
								label="Ad Status"
								name="ad_status"
								value={this.state.ad_status}
								onChange={this.handleInputChange}
							/>
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
									Id : {this.state.square_id}
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

ProductReport.propTypes = {
	productDetails: PropTypes.array,
	onCreateProduct: PropTypes.func,
	onUpdateProduct: PropTypes.func,
	onMessage: PropTypes.func,
};

ProductReport.defaultProps = {
	onCreateProduct: f => f,
	onUpdateProduct: f => f,
	onMessage: f => f,
};

export default ProductReport;