import React from 'react';
import { AdminCompany } from './companyPage.js';
// import './stylesheet/HomeFounder.scss';

class AdminCompanyPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
	}

	componentWillUnmount() {
	}

	render() {
		return (
			<div className="App-clock">
				<AdminCompany />
			</div>
		);
	}
}

export default AdminCompanyPage;