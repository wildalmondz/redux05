import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './stylesheet/VideosPage.scss';
import CompanyReport  from "./CompanyReport.jsx";

class CompanyPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			company: '',
			currentId: '',
			onFetchCompanyId: this.props.onFetchCompanyId,
		};
	}

	// 						<table id="square-table">

	render() {
		const {
			count,
			onFetchCompanyId,
		} = this.props;
		return (
			(
				<div id="videos" style={this.style}>
					{
						count % 2 === 0 ? (
							<tr className="even">
								<td className="type">{this.props.type}</td>
								<td className="name"
									onClick={() => {
										onFetchCompanyId(this.props.id);
									}}>{this.props.name}
								</td>
							</tr>
						) : (
							<tr className="odd">
								<td className="type">{this.props.type}</td>
								<td className="name"
									onClick={() => {
										onFetchCompanyId(this.props.id);
									}}>{this.props.name}
								</td>
							</tr>
						)
					}
				</div>)
		);
	}
}

CompanyPage.propTypes = {
	onFetchCompanyId: PropTypes.func,
	count: PropTypes.number.isRequired,
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string,
	slug: PropTypes.string,
};

CompanyPage.defaultProps = {
	onFetchCompanyId: f => f,
};

export default CompanyPage;
