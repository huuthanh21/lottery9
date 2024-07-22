import {
	Card,
	CardContent,
	CardMedia,
	Container,
	Grid,
	Typography,
	keyframes,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

// Define keyframe animations
const scaleUp = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
`;

const textGradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

const Features = () => {
	const { t } = useTranslation('global');
	const features = [
		{
			description: t('easyToPlayDesc'),
			image:
				'https://images.unsplash.com/photo-1493185659424-16c86605dd4f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			title: t('easyToPlay'),
		},
		{
			description: t('fairAndSecureDesc'),
			image:
				'https://plus.unsplash.com/premium_photo-1682125939509-03aa8ae4b587?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			title: t('fairAndSecure'),
		},
		{
			description: t('bigRewardsDesc'),
			image:
				'https://images.unsplash.com/photo-1640161704729-cbe966a08476?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			title: t('bigRewards'),
		},
	];

	return (
		<Container sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<Typography
				align="center"
				gutterBottom
				sx={{
					mb: 6,
					background: 'linear-gradient(45deg, #00c6ff, #0072ff)',
					backgroundClip: 'text',
					color: 'transparent',
					fontWeight: 'bold',
					fontSize: '3rem',
					textTransform: 'uppercase',
					letterSpacing: '0.1em',
					animation: `${textGradient} 3s linear infinite`,
					position: 'relative',
					display: 'inline-block',
					'&::before': {
						content: '""',
						position: 'absolute',
						bottom: '-10px',
						left: '50%',
						width: '50%',
						height: '5px',
						background: 'rgba(255, 255, 255, 0.5)',
						borderRadius: '5px',
						transform: 'translateX(-50%)',
					},
				}}
				variant="h4"
			>
				{t('whyChooseUs')}
			</Typography>
			<Grid container spacing={4}>
				{features.map((feature, index) => (
					<Grid item key={index} md={4} sm={6} xs={12}>
						<Card
							sx={{
								transition: '0.3s',
								'&:hover': {
									boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
									transform: 'translateY(-5px)',
								},
								overflow: 'hidden',
								borderRadius: '8px',
								cursor: 'pointer',
								display: 'flex',
								flexDirection: 'column',
								height: '100%',
							}}
						>
							<CardMedia
								alt={feature.title}
								component="img"
								height="140"
								image={feature.image}
								sx={{
									transition: 'transform 0.3s ease',
									'&:hover': {
										animation: `${scaleUp} 0.3s ease-in-out`,
									},
								}}
							/>
							<CardContent
								sx={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									textAlign: 'center',
									padding: 3,
								}}
							>
								<Typography component="h2" gutterBottom sx={{ mb: 2 }} variant="h5">
									{feature.title}
								</Typography>
								<Typography color="textSecondary" component="p" variant="body2">
									{feature.description}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default Features;
