import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './stylesheet/VideosPage.scss';
import { withRouter } from 'react-router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Companies, CompanyReportId, CompanySummaryId} from './lib/containers.js';

function findCompany (onFetchCompany, companyName) {
	onFetchCompany(companyName);
}

class CompanyDashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			companySearch: '',
			onFetch: this.props.onFetch,
			onFetchCompany: this.props.onFetchCompany,
			onFetchCompanyId: this.props.onFetchCompanyId,
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	componentDidMount() {
		this._asyncRequest = findCompany(
			this.state.onFetchCompany
		);
	}

	/*
	componentWillReceiveProps(props) {
		this.setState({
			id: props.companyDetails[0].id,
			name: props.companyDetails[0].name,
			type: props.companyDetails[0].type,
			slug: props.companyDetails[0].slug,
		});
	}


	componentWillUnmount() {
		if (this._asyncRequest) {
			this._asyncRequest.cancel();
		}
	}
	 */

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}

	handleSearch(event) {
		event.preventDefault();

		this._asyncRequest = findCompany(
			this.state.onFetchCompany,
			this.state.companySearch
		);
	}

	render() {
		const {
			companies,
			onFetchCompanyId,
			companyDetail,
		} = this.props;
		return (
			<div>
				<div id="searchLine">
					<TextField
						name="companySearch"
						type="text"
						fullWidth
						placeholder="Search for Company Name"
						maxLength="60"
						variant="standard"
						onKeyPress= {(e) => {
							if (e.key === 'Enter') {
								// alert(this.state.companySearch);
								findCompany(this.state.onFetchCompany, this.state.companySearch);
							}
						}}
						value={this.state.companySearch}
						onChange={this.handleInputChange}
					/>
					{this.state.companySearch ?
						<Button variant="contained" onClick={this.handleSearch}>Search</Button> :
						''
					}
				</div>
				<div id="resultLine">
					<Companies onFetchCompanyId={onFetchCompanyId} companies={companies} />
				</div>
				{this.props.companyDetail === false ?
					<CompanySummaryId/> :
					<CompanyReportId/>
				}
			</div>
		);
	}
}

/*
				{this.props.companyDetail === false ?
					<CompanySummaryId/> :
					<CompanyReportId/>
				}
 */

CompanyDashboard.propTypes = {
	videos: PropTypes.array,
	companies: PropTypes.array,
	onFetch: PropTypes.func,
	onFetchCompany: PropTypes.func,
	onFetchCompanyId: PropTypes.func,
	companyDetails: PropTypes.array,
	companyDetail: PropTypes.bool,
};

CompanyDashboard.defaultProps = {
	onFetch: f => f,
	onFetchCompany: f => f,
	onFetchCompanyId: f => f,
};

export default withRouter(CompanyDashboard);