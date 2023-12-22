import React from 'react';
import PropTypes from 'prop-types';
import {InviteBlogId} from './lib/containers.js';
import './stylesheet/InviteCardList.scss';
import '../UserPages/stylesheet/ForgotPasswordForm.scss';

const InviteBlogList = ({ slugIds = [] }) =>
	(<div className="invite-list">
		{(slugIds.length === 0) ?
			<div className="invite-list" style={{'height': '1em'}}>
			</div> :
			slugIds.map(slugId =>
				(
					<InviteBlogId
						key={slugIds.game_id}
						{...slugId}
					/>))
		}
	</div>
	);

InviteBlogList.propTypes = {
	slugIds: PropTypes.array,
};

export default InviteBlogList;
