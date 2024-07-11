import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Container, Typography } from '@mui/material';
import { ConnectWallet } from '@thirdweb-dev/react';
import React from 'react';

const LoginPrompt: React.FC = () => {
	return (
		<Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'center',
				}}
			>
				<AccountCircleIcon color="primary" sx={{ fontSize: 80 }} />
				<Typography gutterBottom variant="h4">
					Welcome to Crypto Lottery!
				</Typography>
				<Typography gutterBottom variant="h6">
					You need to connect wallet to play the lottery game.
				</Typography>
				<ConnectWallet btnTitle="Connect Wallet" />
			</Box>
		</Container>
	);
};

export default LoginPrompt;
