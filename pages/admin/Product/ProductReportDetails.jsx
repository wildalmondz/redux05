import { Component } from 'react';
import PropTypes from 'prop-types';
import './stylesheet/GameDetails.scss';
import { CountdownId } from '../../main/lib/containers.js';

class GameReportDetails extends Component {
	componentDidMount() {
	}

	componentWillUnmount() {
	}

	render() {
		const {
			description, gameName, expires, expiretime,
		} = this.props;
		return (
			<section className="game-header">
				<div className="gamereport-details">
					<strong>Event Details</strong>
					<ul>
						<li>Name: <strong>{gameName}</strong></li>
						<li>Description: {description}</li>
						<li>Expires: {expires}</li>
						<li>
              Expire Time: <b>{expiretime !== null ? `${expiretime}` : 'None'}</b>
						</li>
					</ul>
					<CountdownId expires={expiretime} />
				</div>
			</section>
		);
	}
}

CompanyReportDetails.propTypes = {
	gameName: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	expires: PropTypes.string.isRequired,
	expiretime: PropTypes.string,
};

export default CompanyReportDetails;
