import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
	return (
		<Box
			component={'footer'}
			sx={{
				color: 'text.secondary',
				py: '16px',
			}}
		>
			<Container>
				<Typography align="center" variant="body1">
					© {new Date().getFullYear()} Lottery Games. Group 9. VNUHCM-US. All rights reserved.
				</Typography>
			</Container>
		</Box>
	);
};

export default Footer;
