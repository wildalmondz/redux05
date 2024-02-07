import React from 'react';
import PropTypes from 'prop-types';
import ProductPage from './ProductPage.jsx';
import '../Company/stylesheet/VideosList.scss';

const ProductPageList = ({
	products = [],
	onFetchProductId,
}) =>
	(<div id="videos-list">
		<table id="square-table">
			{
				(products.length === 0) ?
					<p></p> :
					products.map(product =>
						(<ProductPage
							{...product}
							key={product.count}
							onFetchProductId={onFetchProductId}
						/>))
			}
		</table>
	</div>);

ProductPageList.propTypes = {
	onFetchProductId: PropTypes.func,
	products: PropTypes.array,
};

ProductPageList.defaultProps = {
	onFetchProductId: f => f,
};

export default ProductPageList;

/*
export class ProductPageList {
}

 */