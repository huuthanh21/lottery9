import { Box, CircularProgress, Typography, keyframes } from '@mui/material';
import { useContract, useContractRead } from '@thirdweb-dev/react';
import Countdown from 'react-countdown';
import { useTranslation } from 'react-i18next';

// Keyframe animations
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

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

	const { t } = useTranslation('global');

	const renderer = ({ completed, hours, minutes, seconds }: CountdownTimerProps) => {
		if (completed) {
			return (
				<Box
					sx={{
						textAlign: 'center',
						p: 3,
						backgroundColor: 'background.default',
						borderRadius: 2,
						boxShadow: 2,
					}}
				>
					<Typography
						sx={{ animation: `${bounce} 2s infinite`, mb: 2, color: 'error.main' }}
						variant="h5"
					>
						{t('ticketSalesHaveNowClosedForThisDraw')}
					</Typography>
					<Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
						<Box>
							<Typography
								sx={{ animation: `${pulse} 2s infinite`, color: 'primary.main' }}
								variant="h3"
							>
								{hours}
							</Typography>
							<Typography>{t('hours')}</Typography>
						</Box>
						<Box>
							<Typography
								sx={{ animation: `${pulse} 2s infinite`, color: 'primary.main' }}
								variant="h3"
							>
								{minutes}
							</Typography>
							<Typography>{t('minutes')}</Typography>
						</Box>
						<Box>
							<Typography
								sx={{ animation: `${pulse} 2s infinite`, color: 'primary.main' }}
								variant="h3"
							>
								{seconds}
							</Typography>
							<Typography>{t('seconds')}</Typography>
						</Box>
					</Box>
				</Box>
			);
		} else {
			return (
				<Box
					sx={{
						textAlign: 'center',
						p: 3,
						backgroundColor: 'background.default',
						borderRadius: 2,
						boxShadow: 2,
					}}
				>
					<Typography sx={{ color: 'text.secondary', fontStyle: 'italic', mb: 2 }} variant="h6">
						{t('timeRemaining')}
					</Typography>
					<Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
						<Box>
							<Typography variant="h3">{hours}</Typography>
							<Typography>{t('hours')}</Typography>
						</Box>
						<Box>
							<Typography variant="h3">{minutes}</Typography>
							<Typography>{t('minutes')}</Typography>
						</Box>
						<Box>
							<Typography variant="h3">{seconds}</Typography>
							<Typography>{t('seconds')}</Typography>
						</Box>
					</Box>
				</Box>
			);
		}
	};

	if (isLoading) {
		return (
			<Box
				sx={{
					textAlign: 'center',
					p: 3,
					backgroundColor: 'background.default',
					borderRadius: 2,
					boxShadow: 2,
				}}
			>
				<CircularProgress color="primary" />
			</Box>
		);
	}

	return (
		<Box>
			<Countdown date={new Date(expiration * 1000)} renderer={renderer} />
		</Box>
	);
}
