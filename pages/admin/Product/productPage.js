import React from 'react';
import {PageTemplate} from '../../main/templates/pageTemplates.js';
import {ProductId} from './lib/productContainers.js';
// import Product from './Product_v01.jsx';

export const AdminProduct = () => (
	<PageTemplate>
		<div className="home">
			<br />
			<br />
			<ProductId />
			<br />
			<br />
		</div>
	</PageTemplate>
);
