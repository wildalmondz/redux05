import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography, Link } from '@mui/material';
import Container from '@mui/material/Container';
import FooterCompress from './footerCompress';
import ColorSeperator from './colorSeperator';

const footer = { title: 'DISCOVER, EXPERIENCE, NEVER FORGET YOUR NEXT FAVORITE WINE' };

const Bottomdeal = () => {
	return (
		<Container style={{ height: '100%', width: '100vw', display: 'flex', flexDirection: 'column' }}>
			<Grid container spacing={6} justifyContent="space-evenly" alignItems="center" style={{ flex: 1, width: ('calc(100% + 97px)') }}>
				<FooterCompress>
					<Typography style={{ fontSize: '12px' }} color="#c6a777" gutterBottom>
						{footer.title}
					</Typography>
					<ColorSeperator />
					<ul style={{ listStyle: 'none', padding: 0, textAlign: 'center' }}>
						<li>
							<Typography variant="body2">
								<Link href="#" style={{ fontSize: '10px', color: '#c6a777' }}>
									WildAlmonds, LLC Copyright &#169; 2020-{new Date().getFullYear()}
								</Link>
							</Typography>
						</li>
						<li>
							<Typography variant="body2">
								<Link href="#" style={{ fontSize: '10px', color: '#c6a777' }}>
									Terms & Conditions
								</Link>
							</Typography>
						</li>
						<li>
							<Typography variant="body2">
								<Link href="#" style={{ fontSize: '10px', color: '#c6a777' }}>
									Privacy
								</Link>
							</Typography>
						</li>
						<li>
							<Typography variant="body2">
								<Link href="#" style={{ fontSize: '10px', color: '#c6a777' }}>
									Contact Us
								</Link>
							</Typography>
						</li>
					</ul>
				</FooterCompress>
			</Grid>
		</Container>
	);
};

export default Bottomdeal;
