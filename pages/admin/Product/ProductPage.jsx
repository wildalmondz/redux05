import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Company/stylesheet/VideosPage.scss';

class ProductPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			product: '',
			currentId: '',
			onFetchProductId: this.props.onFetchProductId,
		};
	}

	render() {
		const {
			count,
			onFetchProductId,
		} = this.props;
		return (
			(
				<div id="videos" style={this.style}>
					{
						count % 2 === 0 ? (
							<tr className="even">
								<td className="name"
									onClick={() => {
										onFetchProductId(this.props.square_id);
									}}><span>{this.props.square_name}</span>&emsp;<span>{this.props.square_description}</span>
								</td>
							</tr>
						) : (
							<tr className="odd">
								<td className="name"
									onClick={() => {
										onFetchProductId(this.props.square_id);
									}}><span>{this.props.square_name}</span>&emsp;<span>{this.props.square_description}</span>
								</td>
							</tr>
						)
					}
				</div>)
		);
	}
}

ProductPage.propTypes = {
	onFetchProductId: PropTypes.func,
	count: PropTypes.number.isRequired,
	square_id: PropTypes.number.isRequired,
	square_name: PropTypes.string.isRequired,
	square_description: PropTypes.string,
};

ProductPage.defaultProps = {
	onFetchProductId: f => f,
};

export default ProductPage;
