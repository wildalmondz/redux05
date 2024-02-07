import React, { Component } from 'react';
import './stylesheet/pages.scss';

class Bottomdeal extends Component {
	render() {
		return (
			<div className="bottomcompress">
				<div id="footer-compress">
					<ul>
						<li><a style={{fontSize: '10px'}} >WildAlmonds, LLC Copyright &#169; 2020-2023</a></li>
						<li><a style={{fontSize: '10px'}} href="/about/terms">Terms & Conditions</a></li>
						<li><a style={{fontSize: '10px'}} href="/about/privacy">Privacy</a></li>
						<li><a style={{fontSize: '10px'}} href="mailto:support@wildalmonds.com">Contact Us</a></li>
					</ul>
				</div>
			</div>
		);
	}
}

export default Bottomdeal;
