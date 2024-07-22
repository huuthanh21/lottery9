import Meta from '@/components/Meta';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { keyframes } from '@mui/system';

// Define keyframe animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
`;

const AboutUs = () => {
	return (
		<>
			<Meta title="About Us" />
			<Container
				sx={{
					animation: `${fadeIn} 1s ease-out`,
					backgroundColor: 'background.default',
					minHeight: '100vh',
					py: 8,
				}}
			>
				<Box
					sx={{
						mb: 6,
						textAlign: 'center',
					}}
				>
					<Typography
						sx={{
							animation: `${slideIn} 1s ease-out`,
							color: 'primary.main',
							fontWeight: 'bold',
							mb: 2,
						}}
						variant="h2"
					>
						About Crypto Lottery
					</Typography>
					<Typography
						sx={{
							animation: `${slideIn} 1s ease-out`,
							color: 'text.secondary',
							maxWidth: '600px',
							mb: 4,
							mx: 'auto',
						}}
						variant="h5"
					>
						The Crypto Lottery project is a blockchain-based application that allows users to
						participate in a lottery game using cryptocurrency. Users can buy lottery tickets,
						withdraw winnings, and view lottery statistics. The project aims to leverage the
						transparency and security features of blockchain technology to provide a fair and
						decentralized lottery system.
					</Typography>
				</Box>

				<Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
					<Grid item md={6} xs={12}>
						<Paper
							elevation={3}
							sx={{
								animation: `${slideIn} 1s ease-out`,
								display: 'flex',
								flexDirection: 'column',
								height: '100%',
								p: 3,
							}}
						>
							<Typography gutterBottom variant="h4">
								Team
							</Typography>
							<Typography paragraph variant="body1">
								<strong>20120454</strong> - Cong-Dat Le
								<br />
								<strong>20120489</strong> - Phi-Hung Vo
								<br />
								<strong>20120558</strong> - Ngoc-Quang Luu
								<br />
								<strong>20120582</strong> - Huu-Thanh Tran
							</Typography>
						</Paper>
					</Grid>

					<Grid item md={6} xs={12}>
						<Paper
							elevation={3}
							sx={{
								animation: `${slideIn} 1s ease-out`,
								display: 'flex',
								flexDirection: 'column',
								height: '100%',
								p: 3,
							}}
						>
							<Typography gutterBottom variant="h4">
								Instructor
							</Typography>
							<Typography variant="body1">
								<strong>M.S. </strong>Van-Quy Tran
								<br />
								<strong>M.S. </strong>Duy-Quang Tran
								<br />
								<strong>M.S. </strong>Nguyen-Kha Do
							</Typography>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default AboutUs;
