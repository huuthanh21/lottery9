import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
	return (
		<Box
			component="footer"
			sx={{
				backgroundColor: 'primary.dark', // Dark background for the footer
				boxShadow: 3, // Add subtle shadow
				color: 'white', // Light text color for contrast
				mt: 4, // Margin top to create space from the content above
				py: 4, // More padding on top and bottom
				textAlign: 'center', // Center the text
			}}
		>
			<Container maxWidth="md">
				<Typography variant="body2">
					© {new Date().getFullYear()} Lottery Games. Group 9. VNUHCM-US. All rights reserved.
				</Typography>
				<Typography sx={{ display: 'block', mt: 1 }} variant="caption">
					Designed with ❤️ by Group 9
				</Typography>
			</Container>
		</Box>
	);
};

export default Footer;
