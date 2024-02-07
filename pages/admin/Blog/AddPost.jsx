import React from 'react';
import PropTypes from 'prop-types';
import './stylesheet/AddBlogPost.scss';
import { logMeIn, signMeUp } from '../../../../lib/loginHelp';
import {withRouter} from 'react-router-dom';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Clock from '../../main/Clock.jsx';
// import {MessageBoardId, CompanyDashboardId} from '../../../containers';
import {CompanyDashboardId, MessageBoardId} from '../../main/lib/containers.js';
import {confirmAlert} from 'react-confirm-alert';
import fixDate from '../../main/lib/fixDate.js';

let completed = false;
let allNew = [];
let promises = [];

function BlogEntry(props) {
	const prettyDate = fixDate(props.createdAt);
	return (
		<div id='blog-entry'>
			<h3>{props.title}</h3>
			<h5>{prettyDate}</h5>
			<div>
				<article id='blogtext'>{props.blog}</article>
			</div>
		</div>
	);
}

function delay(sendMessage, message, addOn) {
	// `delay` returns a promise
	const toSend = (`${message} ${addOn}`);

	return new Promise(function(resolve, reject) {
		// Only `delay` is able to resolve or reject the promise
		setTimeout(function() {
			sendMessage(toSend);
			resolve('WildAlmonds'); // After 3 seconds, resolve the promise with value 42
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
		allNew.push({ [name]: newVal });
		resolve(newVal);
		reject(err);
	});
}

export class AddPost extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			name: '',
			type: '',
			slug: '',
			playerId: this.props.playerId,
			blogTitle: '',
			blogText: '',
			isPublished: false,
			isActive: false,
			status: 'active',
			image: null,
			location: 'https://wildalmonds.com',
			message: 'WildAlmonds',
		}; // You can also pass a Quill Delta here

		this.handleQuillChange = this.handleQuillChange.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleCompanySelect = this.handleCompanySelect.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			id: null,
			blogId: null,
			type: '',
			slug: '',
		});

		if (nextProps.playerId) { this.setState({ playerId: nextProps.playerId }); }

		if ((nextProps.companyDetails) && (nextProps.companyDetails[0])){
			this.setState({
				playerId: nextProps.playerId,
				id: nextProps.companyDetails[0].id,
				company_name: nextProps.companyDetails[0].name,
				type: nextProps.companyDetails[0].type,
				slug: nextProps.companyDetails[0].slug,
			});
		}
	}

	componentDidMount() {
		this._asyncRequest = this.props.onFetchAuthStatus();
		this._asyncRequest = this.props.onFetchPlayerId();
		this.setState({
			location: ('https://wildalmonds.com' + this.props.location.pathname),
			message: this.props.messageText,
			playerId: this.props.playerId,
		});
	}

	handleQuillChange(value) {
		this.setState({
			blogText: value,
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

	handleCompanySelect(event) {
		event.preventDefault();
		this.setState({
			'company': event.target.value,
		});
	}
	handleSearch(event) {
		event.preventDefault();
		const sendMessage = this.props.onMessage;
	}

	handleSubmit(event) {
		event.preventDefault();
		const sendMessage = this.props.onMessage;
		let existing;

		// promises.push(urlEncode2('companyId', this.state.id));
		promises.push(urlEncode2('blogTitle', this.state.blogTitle));
		promises.push(urlEncode2('blogText', this.state.blogText));
		// promises.push(urlEncode2('author', this.state.author));  // get the ID of the active user
		// promises.push(urlEncode2('status', this.state.status));  // depends on the checkbox
		promises.push(urlEncode2('image', this.state.image));

		Promise.all(promises)
			.then((result1) => {
				completed = result1;
				promises = [];
			});

		if ((this.state.blogId == undefined) || (this.state.blogId === '') || this.state.blogId === null) {  // brand new blog tbd

			if ((this.state.blogTitle === '') ||
				(this.state.blogTitle === undefined) ||
				(this.state.blogTitle == null)) {
				confirmAlert({
					title: 'Blog Title Required',
					message: 'Please enter a blog title',
					buttons: [ { label: 'Ok', onClick: () => { return; },},],
				});
			} else {
				console.log(allNew);
				this.props.onCreateBlog(
					this.state.id,
					allNew[0].blogTitle,
					allNew[1].blogText,
					this.state.playerId,
					this.state.status,
					allNew[2].image);

				sendMessage(`Created: ${this.state.company_name}`);
				delay(sendMessage, 'Created ', this.state.company_name)
					.then(function (v) { // `delay` returns a promise
						return sendMessage(v);
					});
			}
		}
		else { // existing blog update
			existing = true;
			alert(existing);
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

	handleSubmit_old(event) {
		event.preventDefault();

		if (this.state.id !== undefined) {
			alert('New record id: ' + this.state.id);
		}
	}

	handleClear_new(event) {
		event.preventDefault();
		confirmAlert({
			title: 'Reset Form',
			message: 'This will clear form data. Are you sure?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						this.setState({
							id: '',
							name: '',
							type: '',
							domain: '',
							slug: '',
						});
					},
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
			messageText, playerId
		} = this.props;
		return (
			<div id="no-auth">
				{(/^10/.test(messageText)) ?
					<div>
						<p>Login</p>
						<Button variant="contained"
								onClick={() => {
									logMeIn();
								}}
						>Login
						</Button>
						<br />
						<p>This is a secure side option. Contact us at support@wildalmonds.com for a demo or create
							an account.</p>
						<Button variant="contained"
								onClick={() => {
									signMeUp();
								}}
						>Signup
						</Button>
					</div>
					:
					<div id="post-auth"
						 style={{
							 paddingTop: '4vw',
							 height: '100%'
						 }}>
						<p></p>
						<MessageBoardId />
						<Clock />
						<div>{playerId}</div>
						<div id="company-search">
							<CompanyDashboardId />
						</div>
						<form onSubmit={this.handleSubmit}>
							{this.state.id !== null ?
								<div id="blog-entry">
									<TextField
										fullWidth
										id="outlined-basic"
										label="Blog Title"
										name="blogTitle"
										type="text"
										placeholder="Your blog title here"
										maxLength="500"
										variant="standard"
										value={this.state.blogTitle}
										onChange={this.handleInputChange}
									/>
									<FormGroup>
										<FormControlLabel control={<Checkbox defaultChecked />} label="Publish" />
										<FormControlLabel disabled control={<Checkbox />} label="Disabled" />
									</FormGroup>
									<br />
									<Button variant="contained" onClick={this.handleSubmit}>Save</Button>
								</div>
								:
								''
							}
						</form>
					</div>}
			</div>
		);
	}
}

AddPost.propTypes = {
	companyDetails: PropTypes.array,
	messageText: PropTypes.string,
	location: PropTypes.object,
	onFetchAuthStatus: PropTypes.func,
	onFetchPlayerId: PropTypes.func,
	playerId: PropTypes.string,
	onMessage: PropTypes.func,
	blogDetails: PropTypes.array,
	onCreateBlog: PropTypes.func,
	onUpdateBlog: PropTypes.func,
};

AddPost.defaultProps = {
	onFetchAuthStatus: f => f,
	onFetchPlayerId: f => f,
	onMessage: f => f,
	onCreateBlog: f => f,
	onUpdateBlog: f => f,
};

export default withRouter(AddPost);

/*
						<div id="company-search">
							<CompanyDashboardId companyDetail={false}/>
						</div>
 */