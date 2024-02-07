import React from 'react';
import { AdminProduct } from './productPage.js';
// import './stylesheet/HomeFounder.scss';

class AdminProductPage extends React.Component {
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
				<AdminProduct />
			</div>
		);
	}
}

export default AdminProductPage;