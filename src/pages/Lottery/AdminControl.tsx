import { currency } from '@/constants';
import useNotifications from '@/store/notifications';
import CurrencyDollarIcon from '@mui/icons-material/AttachMoney';
import ArrowPathIcon from '@mui/icons-material/Autorenew';
import StarIcon from '@mui/icons-material/Star';
import { Box, Button, CircularProgress, Typography, keyframes } from '@mui/material';
import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import React from 'react';
import { useTranslation } from 'react-i18next';

const buttonHover = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
`;

const AdminControls: React.FC = () => {
	const contractAddress = import.meta.env.VITE_LOTTERY_CONTRACT_ADDRESS as string;
	const { contract, isLoading } = useContract(contractAddress);
	const { data: operatorTotalCommission } = useContractRead(contract, 'operatorTotalCommission');

	const { mutateAsync: DrawWinnerTicket } = useContractWrite(contract, 'DrawWinnerTicket');
	const { mutateAsync: RefundAll } = useContractWrite(contract, 'RefundAll');
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { mutateAsync: restartDraw } = useContractWrite(contract, 'restartDraw');
	const { mutateAsync: WithdrawCommission } = useContractWrite(contract, 'WithdrawCommission');
	const [, actions] = useNotifications();

	const { t } = useTranslation('global');

	const drawWinner = async () => {
		const notification = actions.push({
			message: 'Picking a Lucky Winner...',
			options: {
				anchorOrigin: {
					horizontal: 'center',
					vertical: 'top',
				},
				variant: 'info',
			},
		});

		try {
			await DrawWinnerTicket({ args: [] });

			actions.remove(notification);

			actions.push({
				message: 'A Winner has been picked!',
				options: {
					anchorOrigin: {
						horizontal: 'center',
						vertical: 'top',
					},
					variant: 'success',
				},
			});
		} catch (error) {
			actions.remove(notification);
			actions.push({
				message: 'Whoops! Something went wrong',
				options: {
					anchorOrigin: {
						horizontal: 'center',
						vertical: 'top',
					},
					variant: 'error',
				},
			});
			console.error('contract call failure', error);
		}
	};

	const onRefundAll = async () => {
		const notification = actions.push({
			message: 'Refunding All Tickets...',
			options: {
				anchorOrigin: {
					horizontal: 'center',
					vertical: 'top',
				},
				variant: 'info',
			},
		});

		try {
			await RefundAll({ args: [] });

			actions.remove(notification);

			actions.push({
				message: 'All Tickets have been refunded!',
				options: {
					anchorOrigin: {
						horizontal: 'center',
						vertical: 'top',
					},
					variant: 'success',
				},
			});
		} catch (error) {
			actions.remove(notification);
			actions.push({
				message: 'Whoops! Something went wrong',
				options: {
					anchorOrigin: {
						horizontal: 'center',
						vertical: 'top',
					},
					variant: 'error',
				},
			});
			console.error('contract call failure', error);
		}
	};

	const onWithdrawCommission = async () => {
		const notification = actions.push({
			message: 'Withdrawing Commission...',
			options: {
				anchorOrigin: {
					horizontal: 'center',
					vertical: 'top',
				},
				variant: 'info',
			},
		});

		try {
			const data = await WithdrawCommission({ args: [] });

			actions.remove(notification);
			actions.push({
				message: 'Commission has been withdrawn!',
				options: {
					anchorOrigin: {
						horizontal: 'center',
						vertical: 'top',
					},
					variant: 'success',
				},
			});
			console.info(data);
		} catch (error) {
			actions.remove(notification);
			actions.push({
				message: 'Whoops! Something went wrong',
				options: {
					anchorOrigin: {
						horizontal: 'center',
						vertical: 'top',
					},
					variant: 'error',
				},
			});
			console.error('contract call failure', error);
		}
	};

	const onRestartDraw = async () => {
		const notification = actions.push({
			message: 'Restarting...',
			options: {
				anchorOrigin: {
					horizontal: 'center',
					vertical: 'top',
				},
				variant: 'info',
			},
		});

		try {
			const data = await restartDraw({ args: [] });

			actions.remove(notification);
			actions.push({
				message: 'Draw has been restarted!',
				options: {
					anchorOrigin: {
						horizontal: 'center',
						vertical: 'top',
					},
					variant: 'success',
				},
			});
			console.info(data);
		} catch (error) {
			actions.remove(notification);
			actions.push({
				message: 'Whoops! Something went wrong',
				options: {
					anchorOrigin: {
						horizontal: 'center',
						vertical: 'top',
					},
					variant: 'error',
				},
			});
			console.error('contract call failure', error);
		}
	};

	if (isLoading) {
		return (
			<Box textAlign="center">
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box
			sx={{
				border: '1px solid rgba(34, 197, 94, 0.3)',
				borderRadius: 2,
				p: 4,
				textAlign: 'center',
				boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
				backgroundColor: 'background.paper',
				transition: '0.3s',
				'&:hover': {
					boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
				},
			}}
		>
			<Typography
				fontWeight="bold"
				sx={{
					mb: 2,
					color: 'primary.main',
					textTransform: 'uppercase',
					letterSpacing: '0.1em',
				}}
				variant="h5"
			>
				{t('adminControls')}
			</Typography>
			<Typography color="text.primary" sx={{ mb: 4 }} variant="body1">
				{t('totalCommissionToBeWithdrawn')}:{' '}
				{operatorTotalCommission && ethers.utils.formatEther(operatorTotalCommission.toString())}{' '}
				{currency}
			</Typography>
			<Box
				display="flex"
				flexDirection={{ md: 'row', xs: 'column' }}
				gap={2}
				justifyContent={'center'}
				sx={{ flexWrap: 'wrap', mb: 2 }}
			>
				<Button
					color="primary"
					onClick={drawWinner}
					startIcon={<StarIcon />}
					sx={{
						animation: `${buttonHover} 0.3s ease-in-out`,
						px: 3,
						py: 1.5,
						m: 1,
						'&:hover': {
							backgroundColor: 'primary.dark',
							boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
						},
					}}
					variant="contained"
				>
					{t('drawWinner')}
				</Button>
				<Button
					color="primary"
					onClick={onWithdrawCommission}
					startIcon={<CurrencyDollarIcon />}
					sx={{
						animation: `${buttonHover} 0.3s ease-in-out`,
						px: 3,
						py: 1.5,
						m: 1,
						'&:hover': {
							backgroundColor: 'primary.dark',
							boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
						},
					}}
					variant="contained"
				>
					{t('withdrawCommission')}
				</Button>
				<Button
					color="primary"
					onClick={onRestartDraw}
					startIcon={<ArrowPathIcon />}
					sx={{
						animation: `${buttonHover} 0.3s ease-in-out`,
						px: 3,
						py: 1.5,
						m: 1,
						'&:hover': {
							backgroundColor: 'primary.dark',
							boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
						},
					}}
					variant="contained"
				>
					{t('restartDraw')}
				</Button>
				<Button
					color="primary"
					onClick={onRefundAll}
					startIcon={<ArrowPathIcon />}
					sx={{
						animation: `${buttonHover} 0.3s ease-in-out`,
						px: 3,
						py: 1.5,
						m: 1,
						'&:hover': {
							backgroundColor: 'primary.dark',
							boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
						},
					}}
					variant="contained"
				>
					{t('refundAll')}
				</Button>
			</Box>
		</Box>
	);
};

export default AdminControls;
