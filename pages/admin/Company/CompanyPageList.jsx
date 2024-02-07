import React from 'react';
import PropTypes from 'prop-types';
import CompanyPage from './CompanyPage.jsx';
import '../Company/stylesheet/VideosList.scss';

const CompanyList = ({
	companies = [],
	onFetchCompanyId,
}) =>
	(<div id="videos-list">

			{
				(companies.length === 0) ?
					<p></p> :
					companies.map(company =>
						(<CompanyPage
							{...company}
							key={company.count}
							onFetchCompanyId={onFetchCompanyId}
						/>))
			}

	</div>);

CompanyList.propTypes = {
	onFetchCompanyId: PropTypes.func,
	companies: PropTypes.array,
};

CompanyList.defaultProps = {
	onFetchCompanyId: f => f,
};

export default CompanyList;
