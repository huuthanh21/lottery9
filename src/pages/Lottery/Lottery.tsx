import Meta from '@/components/Meta';
import { currency } from '@/constants';
import useNotifications from '@/store/notifications';
import StarIcon from '@mui/icons-material/Star';
import {
	Box,
	Button,
	Container,
	Grid,
	InputAdornment,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import { useAddress, useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

import LoginPrompt from '../LoginPrompt';
import AdminControls from './AdminControl';
import CountdownTimer from './CountdownTimer';
import Loading from './Loading';

const Lottery: React.FC = () => {
	const address = useAddress();
	const [userTicket, setUserTicket] = useState(0);
	const [quantity, setQuantity] = useState<number>(1);
	const { contract, isLoading } = useContract(
		import.meta.env.VITE_LOTTERY_CONTRACT_ADDRESS as string,
	);
	const { data: remainingTickets } = useContractRead(contract, 'RemainingTickets');
	const { data: currentWinningReward } = useContractRead(contract, 'CurrentWinningReward');
	const { data: ticketCommission } = useContractRead(contract, 'ticketCommission');
	const { data: expiration } = useContractRead(contract, 'expiration');
	const { data: ticketPrice } = useContractRead(contract, 'ticketPrice');
	const { mutateAsync: BuyTickets } = useContractWrite(contract, 'BuyTickets');
	const { data: winners } = useContractRead(contract, 'getWinningsForAddress', [address]);
	const { mutateAsync: WithdrawWinnings } = useContractWrite(contract, 'WithdrawWinnings');
	const { data: lastWinner } = useContractRead(contract, 'lastWinner');
	const { data: lastWinnerAmount } = useContractRead(contract, 'lastWinnerAmount');
	const { data: lotteryOperator } = useContractRead(contract, 'lotteryOperator');
	const { data: tickets } = useContractRead(contract, 'getTickets');
	const [, actions] = useNotifications();

	useEffect(() => {
		if (!tickets) return;

		const totalTickets: string[] = tickets;

		const noOfUserTickets = totalTickets.reduce(
			(total, ticketAddress) => (ticketAddress === address ? total + 1 : total),
			0,
		);
		setUserTicket(noOfUserTickets);
	}, [tickets, address]);

	const handleClick = async () => {
		if (!ticketPrice) return;

		const notification = actions.push({
			message: 'Buying Tickets...',
			options: {
				anchorOrigin: {
					horizontal: 'center',
					vertical: 'top',
				},
				variant: 'info',
			},
		});

		try {
			await BuyTickets({
				args: [
					{
						value: ethers.utils.parseEther(
							(Number(ethers.utils.formatEther(ticketPrice)) * quantity).toString(),
						),
					},
				],
			});

			actions.remove(notification);

			actions.push({
				message: 'Tickets bought successfully!',
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

	const onWithdrawWinning = async () => {
		const notification = actions.push({
			message: 'Withdrawing Winnings...',
			options: {
				anchorOrigin: {
					horizontal: 'center',
					vertical: 'top',
				},
				variant: 'info',
			},
		});

		try {
			await WithdrawWinnings({ args: [] });

			actions.remove(notification);

			actions.push({
				message: 'Winnings withdrawn successfully!',
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

	if (isLoading) return <Loading />;
	if (!address) return <LoginPrompt />;

	return (
		<>
			<Meta title="Lottery Game" />
			<Container
				maxWidth="lg"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100vh',
				}}
			>
				<Box sx={{ flex: 1 }}>
					<Box
						sx={{
							border: '1px solid rgba(34, 197, 94, 0.2)',
							display: 'flex',
							justifyContent: 'center',
							marginBottom: 2,
							padding: 2,
						}}
					>
						<Typography variant="h6">Last Winner: {lastWinner?.toString()}</Typography>
						<Typography sx={{ marginLeft: 5 }} variant="h6">
							Previous winnings:{' '}
							{lastWinnerAmount && ethers.utils.formatEther(lastWinnerAmount?.toString())}
						</Typography>
					</Box>

					{lotteryOperator === address && (
						<Box display="flex" justifyContent="center">
							<AdminControls />
						</Box>
					)}

					{winners > 0 && (
						<Box margin="auto" marginTop={2} maxWidth="md">
							<Button
								color="success"
								fullWidth
								onClick={onWithdrawWinning}
								sx={{ animation: 'pulse 2s infinite', fontSize: '1.2rem', padding: 3 }}
								variant="contained"
							>
								Winner Winner Chicken Dinner
								<Typography variant="h6">
									Total Winnings: {ethers.utils.formatEther(winners.toString())}
								</Typography>
								<Typography variant="body1">Click Here to Withdraw</Typography>
							</Button>
						</Box>
					)}

					<Grid
						alignItems="flex-start"
						container
						justifyContent="center"
						spacing={3}
						sx={{ marginTop: 2 }}
					>
						<Grid item md={6} xs={12}>
							<Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
								<Typography variant="h4">The Next Draw</Typography>
								<Box display="flex" justifyContent="space-between" padding={2}>
									<Box>
										<Typography variant="h6">Total Pool</Typography>
										<Typography variant="h5">
											{currentWinningReward &&
												ethers.utils.formatEther(currentWinningReward.toString())}{' '}
											{currency}
										</Typography>
									</Box>
									<Box>
										<Typography variant="h6">Tickets Remaining</Typography>
										<Typography variant="h5">{remainingTickets?.toNumber()}</Typography>
									</Box>
								</Box>
								<CountdownTimer />
							</Paper>
						</Grid>
						<Grid item md={6} xs={12}>
							<Paper elevation={3} sx={{ padding: 2 }}>
								<Box alignItems="center" display="flex" justifyContent="space-between">
									<Typography variant="h6">Price Per Ticket</Typography>
									<Typography variant="h6">
										{ticketPrice && ethers.utils.formatEther(ticketPrice?.toString())} {currency}
									</Typography>
								</Box>
								<Box
									alignItems="center"
									border={1}
									borderColor="#004337"
									display="flex"
									gap={2}
									marginY={2}
									padding={2}
								>
									<Typography variant="body1">TICKET</Typography>
									<TextField
										InputProps={{
											disableUnderline: true,
											endAdornment: <InputAdornment position="end">Qty</InputAdornment>,
										}}
										fullWidth
										inputProps={{ max: 10, min: 1 }}
										onChange={(e) => setQuantity(Number(e.target.value))}
										type="number"
										value={quantity}
										variant="standard"
									/>
								</Box>
								<Box marginTop={2}>
									<Box display="flex" justifyContent="space-between">
										<Typography color="success.main" variant="body1">
											Total cost tickets
										</Typography>
										<Typography color="success.main" variant="body1">
											{ticketPrice &&
												Number(ethers.utils.formatEther(ticketPrice?.toString())) * quantity}{' '}
											{currency}
										</Typography>
									</Box>
									<Box display="flex" justifyContent="space-between">
										<Typography color="success.main" variant="body2">
											Service fees
										</Typography>
										<Typography color="success.main" variant="body2">
											{ticketCommission && ethers.utils.formatEther(ticketCommission?.toString())}{' '}
											{currency}
										</Typography>
									</Box>
									<Box display="flex" justifyContent="space-between">
										<Typography color="success.main" variant="body2">
											+ Network Fees
										</Typography>
										<Typography color="success.main" variant="body2">
											TBC
										</Typography>
									</Box>
								</Box>
								<Button
									color="primary"
									disabled={
										expiration?.toString() < Date.now().toString() ||
										remainingTickets?.toNumber() === 0
									}
									fullWidth
									onClick={handleClick}
									sx={{ marginTop: 2 }}
									variant="contained"
								>
									Buy {quantity} Tickets for{' '}
									{ticketPrice &&
										Number(ethers.utils.formatEther(ticketPrice.toString())) * quantity}{' '}
									{currency}
								</Button>
							</Paper>
							{userTicket > 0 && (
								<Paper elevation={3} sx={{ marginTop: 2, padding: 2 }}>
									<Typography variant="h6">You have {userTicket} Tickets in this draw</Typography>
									<Box display="flex" flexWrap="wrap" marginTop={2}>
										{Array(userTicket)
											.fill('')
											.map((_, index) => (
												<StarIcon color="primary" key={index} />
											))}
									</Box>
								</Paper>
							)}
						</Grid>
					</Grid>
					<Box padding={2} textAlign="center">
						<Typography color="text.secondary" variant="body2">
							DISCLAIMER: This is not a REAL LOTTERY, it is a demo.
						</Typography>
					</Box>
				</Box>
			</Container>
		</>
	);
};

export default Lottery;