import { title } from '@/config';
import { Box, Button, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
	const naviagte = useNavigate();
	const { t } = useTranslation('global');
	return (
		<Box
			style={{
				alignItems: 'center',
				backgroundImage:
					'url(https://images.unsplash.com/photo-1593453918093-8f308edb9e45?q=80&w=1916&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				color: 'white',
				display: 'flex',
				height: '90vh',
				position: 'relative',
			}}
		>
			<Box
				style={{
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					bottom: 0,
					left: 0,
					position: 'absolute',
					right: 0,
					top: 0,
					zIndex: 1,
				}}
			/>
			<Container style={{ position: 'relative', zIndex: 2 }}>
				<Typography fontWeight={'bold'} gutterBottom variant="h2">
					{t('welcomeTo')} {title}
				</Typography>
				<Typography paragraph variant="h5">
					{t('slogan')}
				</Typography>
				<Button
					color="primary"
					onClick={() => {
						naviagte('/lottery');
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
