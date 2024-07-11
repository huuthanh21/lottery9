import { currency } from '@/constants';
import useNotifications from '@/store/notifications';
import CurrencyDollarIcon from '@mui/icons-material/AttachMoney';
import ArrowPathIcon from '@mui/icons-material/Autorenew';
import StarIcon from '@mui/icons-material/Star';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import React from 'react';

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
			await DrawWinnerTicket({ args: [] });

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
			const data = await RefundAll({ args: [] });

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
				border: '1px solid rgba(34, 197, 94, 0.2)',
				borderRadius: 1,
				p: 3,
				textAlign: 'center',
			}}
		>
			<Typography fontWeight="bold" variant="h5">
				Admin Controls
			</Typography>
			<Typography sx={{ mb: 3 }} variant="body1">
				Total Commission to be Withdrawn:{' '}
				{operatorTotalCommission && ethers.utils.formatEther(operatorTotalCommission.toString())}{' '}
				{currency}
			</Typography>
			<Box
				display="flex"
				flexDirection={{ md: 'row', xs: 'column' }}
				gap={2}
				justifyContent={'center'}
			>
				<Button color="primary" onClick={drawWinner} startIcon={<StarIcon />} variant="contained">
					Draw Winner
				</Button>
				<Button
					color="primary"
					onClick={onWithdrawCommission}
					startIcon={<CurrencyDollarIcon />}
					variant="contained"
				>
					Withdraw Commission
				</Button>
				<Button
					color="primary"
					onClick={onRestartDraw}
					startIcon={<ArrowPathIcon />}
					variant="contained"
				>
					Restart Draw
				</Button>
				<Button
					color="primary"
					onClick={onRefundAll}
					startIcon={<ArrowPathIcon />}
					variant="contained"
				>
					Refund All
				</Button>
			</Box>
		</Box>
	);
};

export default AdminControls;
