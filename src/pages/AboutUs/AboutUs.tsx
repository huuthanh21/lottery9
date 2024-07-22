import Meta from '@/components/Meta';
import { title } from '@/config';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { keyframes } from '@mui/system';
import { useTranslation } from 'react-i18next';

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
	const { t } = useTranslation('global');
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
						{t('about')} {title}
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
						{t('aboutMessage')}
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
								<strong>20120454</strong> - {t('20120454')}
								<br />
								<strong>20120489</strong> - {t('20120489')}
								<br />
								<strong>20120558</strong> - {t('20120558')}
								<br />
								<strong>20120582</strong> - {t('20120582')}
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
								<strong>{t('ms')}</strong> {t('vanQuyTran')}
								<br />
								<strong>{t('ms')}</strong> {t('duyQuangTran')}
								<br />
								<strong>{t('ms')}</strong> {t('nguyenKhaDo')}
							</Typography>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default AboutUs;
