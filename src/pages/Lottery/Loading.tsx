import { Avatar, Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

const Loading: React.FC = () => {
	return (
		<Box
			sx={{
				alignItems: 'center',
				bgcolor: 'background.default',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				minHeight: '100vh',
				textAlign: 'center',
			}}
		>
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					mb: 2,
				}}
			>
				<Avatar
					alt="Loading"
					src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExc29ycWd4bmE0NDh5NjJkdm83eHY2bDZoc3lta3Z1dTJzeWxndmhybiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RODiNw1qKHct74LACe/giphy.gif"
					sx={{ height: 80, width: 80 }}
				/>
				<Typography sx={{ color: 'text.primary', fontWeight: 'bold', ml: 2 }} variant="h6">
					Loading...
				</Typography>
			</Box>
			<CircularProgress color="primary" size={60} />
		</Box>
	);
};

export default Loading;
