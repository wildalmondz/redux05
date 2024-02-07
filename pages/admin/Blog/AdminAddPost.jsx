import React from 'react';
import { AddPost } from './AddPost.jsx';
import { PageTemplate } from '../../main/templates/pageTemplates.js';
// import './stylesheet/HomeFounder.scss';

class AdminAddPost extends React.Component {
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
			<PageTemplate>
				<div className="App-clock">
					<AddPost />
				</div>
			</PageTemplate>
		);
	}
}

export default AdminAddPost;