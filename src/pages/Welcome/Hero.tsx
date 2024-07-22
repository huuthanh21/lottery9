import { title } from '@/config';
import { Box, Button, Container, Typography, keyframes } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// Define keyframe animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
`;

const Hero = () => {
	const navigate = useNavigate();
	const { t } = useTranslation('global');

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundImage:
					'url(https://images.unsplash.com/photo-1593453918093-8f308edb9e45?q=80&w=1916&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				color: 'white',
				height: '90vh',
				position: 'relative',
				textAlign: 'center',
				overflow: 'hidden',
				animation: `${fadeIn} 1s ease-out`,
			}}
		>
			<Box
				sx={{
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					position: 'absolute',
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
					zIndex: 1,
				}}
			/>
			<Container
				sx={{
					position: 'relative',
					zIndex: 2,
					textAlign: 'center',
					animation: `${slideUp} 1s ease-out`,
				}}
			>
				<Typography
					sx={{
						fontWeight: 'bold',
						mb: 2,
						animation: `${slideUp} 1s ease-out`,
					}}
					variant="h2"
				>
					{t('welcomeTo')} {title}
				</Typography>
				<Typography
					sx={{
						mb: 4,
						animation: `${slideUp} 1s ease-out`,
					}}
					variant="h5"
				>
					{t('slogan')}
				</Typography>
				<Button
					color="primary"
					onClick={() => navigate('/lottery')}
					sx={{
						px: 4,
						py: 2,
						borderRadius: '25px',
						fontSize: '1rem',
						fontWeight: 'bold',
						transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
						boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
						'&:hover': {
							transform: 'scale(1.05)',
							boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
						},
						animation: `${slideUp} 1s ease-out`,
					}}
					variant="contained"
				>
					{t('getStarted')}
				</Button>
			</Container>
		</Box>
	);
};

export default Hero;
