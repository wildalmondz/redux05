import React from 'react';
import PropTypes from 'prop-types';

import { logMeIn, signMeUp } from '../../../../lib/loginHelp';
import {withRouter} from 'react-router-dom';
import Button from '@mui/material/Button';
import './stylesheet/Admin.scss';
import '../Company/stylesheet/CompanyReport.scss';
import { CompanyDashboardId, MessageBoardId } from '../../main/lib/containers';

class Company extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			company: '',
			companySearch: '',
			blogTitle: '',
			blogText: '',
			companies: [],
			isPublished: false,
			isActive: false,
			location: 'https://wildalmonds.com',
		}; // You can also pass a Quill Delta here

		this.handleQuillChange = this.handleQuillChange.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleCompanySelect = this.handleCompanySelect.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this._asyncRequest = this.props.onFetchAuthStatus();
		// alert('https://wildalmonds.com' + this.props.location.pathname);
		this.setState({
			location: ('https://wildalmonds.com' + this.props.location.pathname),
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

		this.setState({
			value: '',
		});
	}

	render() {
		const {
			messagetext,
		} = this.props;
		return (
			<div id="adminpage">
				{(/^10/.test(messagetext)) ?
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
						<							Button variant="contained"
							onClick={() => {
								signMeUp();
							}}
						>Signup
						</Button>
					</div>
					:
					<div id="adminlayout">
						<div id="admintop">
							<MessageBoardId />
						</div>
						<div id="adminbottom">
							<CompanyDashboardId />
						</div>
					</div>
				}
			</div>
		);
	}
}

Company.propTypes = {
	messagetext: PropTypes.string,
	location: PropTypes.object,
	onFetchAuthStatus: PropTypes.func,
	onMessage: PropTypes.func,
};

Company.defaultProps = {
	onFetchAuthStatus: f => f,
	onMessage: f => f,
};

export default withRouter(Company);
