import React from 'react';
import {PageTemplate} from '../../main/templates/pageTemplates.js';
import AddPost from './AddPost.jsx';

export const AdminCompany = () => (
	<PageTemplate>
		<div className="home">
			<br />
			<br />
			<AddPost />
		</div>
	</PageTemplate>
);
