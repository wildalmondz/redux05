import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Company/stylesheet/CompanyReport.scss';

class ProductSummary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			company: this.props.companyDetails,
			id: '',
			name: '',
			type: '',
			slug: '',
		};
	}

	componentDidMount() {
	}

	componentWillUnmount() {
		if (this._asyncRequest) {
			this._asyncRequest.cancel();
		}
	}

	componentWillReceiveProps(props) {
		this.setState({
			id: '',
			name: '',
			type: '',
			slug: '',
		});

		if (props.companyDetails[0]){
			this.setState({
				id: props.companyDetails[0].id,
				name: props.companyDetails[0].name,
				type: props.companyDetails[0].type,
				slug: props.companyDetails[0].slug,
			});
		}
	}

	render() {
		const {
			companyDetails,
		} = this.props;
		return (
			<section id="adminPage">
				<section id="admin">
					<div id="companyValues">
						<div id="buttonGroup" >
							<div className="flex-parent-element">
								<div className="flex-child-element magenta">
									Id : {this.state.id}
									<br />
									Name: {this.state.name}
									<br />
								</div>
								<div className="flex-child-element green">
									Type: {this.state.type}
									<br />
									Slug: {this.state.slug}
								</div>
							</div>
						</div>
					</div>
				</section>
			</section>
		);
	}
}

ProductSummary.propTypes = {
	companyDetails: PropTypes.array,
	id: PropTypes.number,
	name: PropTypes.string,
	type: PropTypes.string,
	slug: PropTypes.string,
};

ProductSummary.defaultProps = {
	id: '',
	name: '',
	type: '',
	slug: '',
};

export default ProductSummary;