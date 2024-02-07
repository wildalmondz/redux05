import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Company/stylesheet/VideosPage.scss';

import { withRouter } from 'react-router';
// import { Products, ProductReportId, ProductSummaryId } from './lib/containers';
import { Products, ProductReportId, ProductSummaryId } from './lib/productContainers.js';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function findProduct (onFetchProduct, productName) {
	onFetchProduct(productName);
}

class ProductDashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			productSearch: null,
			onFetch: this.props.onFetch,
			onFetchProduct: this.props.onFetchProduct,
			onFetchProductId: this.props.onFetchProductId,
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	componentDidMount() {
		/*
		this._asyncRequest = findProduct(
			this.state.onFetchProduct
		);

		 */
	}

	componentWillUnmount() {
		if (this._asyncRequest) {
			this._asyncRequest.cancel();
		}
	}

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

		this._asyncRequest = findProduct(
			this.state.onFetchProduct,
			this.state.productSearch
		);
	}

	/*
	square_id
	event_id
	image_id
	square_name
	square_description
	square_division
	square_rank
	child_id
	square_status
	impage_path
	reserve_url
	map_url
	video_url
	isAd
	ad_status
	 */


	render() {
		const {
			products,
			onFetchProductId,
			productDetail,
		} = this.props;
		return (
			<div>
				<div id="searchLine">
					<TextField
						name="productSearch"
						type="text"
						fullWidth
						placeholder="Search for Product Name"
						maxLength="60"
						variant="standard"
						onKeyPress= {(e) => {
							if (e.key === 'Enter') {
								// alert(this.state.companySearch);
								findProduct(this.state.onFetchProduct, this.state.productSearch);
							}
						}}
						value={this.state.productSearch}
						onChange={this.handleInputChange}
					/>
					{(this.state.productSearch != null) ?
						<Button variant="contained" onClick={this.handleSearch}>Search</Button> :
						''
					}
				</div>
				<div id="video-place">
					<Products />
				</div>
				{this.props.productDetail === false ?
					<ProductSummaryId/> :
					<ProductReportId/>
				}

			</div>
		);
	}
}
/*
				{this.props.productDetail === false ?
					<ProductSummaryId/> :
					<ProductReportId/>
				}
 */
// <Products onFetchProductId={onFetchProductId} products={products} />

ProductDashboard.propTypes = {
	videos: PropTypes.array,
	products: PropTypes.array,
	onFetch: PropTypes.func,
	onFetchProduct: PropTypes.func,
	onFetchProductId: PropTypes.func,
	productDetails: PropTypes.array,
	productDetail: PropTypes.bool,
};

ProductDashboard.defaultProps = {
	onFetch: f => f,
	onFetchProduct: f => f,
	onFetchProductId: f => f,
};

export default withRouter(ProductDashboard);