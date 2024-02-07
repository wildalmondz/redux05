import React from 'react';
import {PageTemplate} from '../../main/templates/pageTemplates.js';
import {CompanyId} from './lib/containers.js';

export const AdminCompany = () => (
	<PageTemplate>
		<div className="home">
			<br />
			<br />
			<CompanyId />
		</div>
	</PageTemplate>
);
