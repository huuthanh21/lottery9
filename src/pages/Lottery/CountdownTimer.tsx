import { Box, CircularProgress, Typography } from '@mui/material';
import { useContract, useContractRead } from '@thirdweb-dev/react';
import Countdown from 'react-countdown';

type CountdownTimerProps = {
	completed?: boolean;
	hours?: number;
	minutes?: number;
	seconds?: number;
};

export default function CountdownTimer() {
	const { contract, isLoading } = useContract(
		import.meta.env.VITE_LOTTERY_CONTRACT_ADDRESS as string,
	);
	const { data: expiration } = useContractRead(contract, 'expiration');

	const renderer = ({ completed, hours, minutes, seconds }: CountdownTimerProps) => {
		if (completed) {
			return (
				<Box sx={{ textAlign: 'center' }}>
					<Typography sx={{ animation: 'bounce 2s infinite', mb: 2 }} variant="h5">
						Ticket Sales have now CLOSED for this draw
					</Typography>
					<Box sx={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
						<Box>
							<Typography sx={{ animation: 'pulse 2s infinite' }} variant="h3">
								{hours}
							</Typography>
							<Typography>Hours</Typography>
						</Box>
						<Box>
							<Typography sx={{ animation: 'pulse 2s infinite' }} variant="h3">
								{minutes}
							</Typography>
							<Typography>Minutes</Typography>
						</Box>
						<Box>
							<Typography sx={{ animation: 'pulse 2s infinite' }} variant="h3">
								{seconds}
							</Typography>
							<Typography>Seconds</Typography>
						</Box>
					</Box>
				</Box>
			);
		} else {
			return (
				<Box sx={{ textAlign: 'center' }}>
					<Typography sx={{ color: 'white', fontStyle: 'italic', mb: 2 }} variant="h6">
						Time Remaining
					</Typography>
					<Box sx={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
						<Box>
							<Typography variant="h3">{hours}</Typography>
							<Typography>Hours</Typography>
						</Box>
						<Box>
							<Typography variant="h3">{minutes}</Typography>
							<Typography>Minutes</Typography>
						</Box>
						<Box>
							<Typography variant="h3">{seconds}</Typography>
							<Typography>Seconds</Typography>
						</Box>
					</Box>
				</Box>
			);
		}
	};

	if (isLoading) {
		return (
			<Box sx={{ textAlign: 'center' }}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box>
			<Countdown date={new Date(expiration * 1000)} renderer={renderer} />
		</Box>
	);
}
