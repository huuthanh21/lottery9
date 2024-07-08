import {
	Alert,
	AlertColor,
	Box,
	Button,
	Container,
	Paper,
	Snackbar,
	TextField,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

function NumberGuessing() {
	const [targetNumber, setTargetNumber] = useState(0);
	const [guess, setGuess] = useState('');
	const [bet, setBet] = useState('');
	const [balance, setBalance] = useState(100);
	const [message, setMessage] = useState('');
	const [gameOver, setGameOver] = useState(false);
	const [snackbar, setSnackbar] = useState({ message: '', open: false, severity: 'info' });
	const RANGE = 5;

	useEffect(() => {
		generateRandomNumber();
	}, []);

	const generateRandomNumber = () => {
		setTargetNumber(Math.floor(Math.random() * RANGE) + 1);
		setGuess('');
		setGameOver(false);
	};

	const handleGuess = () => {
		const userGuess = parseInt(guess);

		if (userGuess < 1 || userGuess > RANGE) {
			setSnackbar({
				message: `Please enter a number between 1 and ${RANGE}`,
				open: true,
				severity: 'error',
			});
			return;
		}

		const userBet = parseInt(bet);

		if (isNaN(userGuess) || isNaN(userBet) || userBet <= 0 || userBet > balance) {
			setSnackbar({ message: 'Invalid guess or bet', open: true, severity: 'error' });
			return;
		}

		setGameOver(true);

		if (userGuess === targetNumber) {
			const winnings = userBet * 3;
			setBalance(balance + winnings);
			setMessage(`Congratulations! You won $${winnings}!`);
		} else {
			setBalance(balance - userBet);
			setMessage(`Sorry, the number was ${targetNumber}. You lost $${userBet}.`);
		}

		if (balance - userBet <= 0) {
			setSnackbar({ message: 'Game over! You ran out of money.', open: true, severity: 'warning' });
		}
	};

	const handleNewGame = () => {
		if (balance > 0) {
			generateRandomNumber();
		} else {
			setSnackbar({
				message: 'No more funds. Please reset the game.',
				open: true,
				severity: 'error',
			});
		}
	};

	const handleResetGame = () => {
		setBalance(100);
		generateRandomNumber();
		setSnackbar({ message: 'Game reset. Good luck!', open: true, severity: 'success' });
	};

	return (
		<Container maxWidth="sm">
			<Paper elevation={3} sx={{ mt: 4, p: 4 }}>
				<Typography gutterBottom variant="h4">
					Number Guessing Game
				</Typography>
				<Typography gutterBottom variant="body1">
					Guess a number between 1 and 5
				</Typography>
				<Typography gutterBottom variant="h6">
					Balance: ${balance}
				</Typography>
				<Box sx={{ my: 2 }}>
					<TextField
						disabled={gameOver}
						fullWidth
						label="Enter your guess"
						onChange={(e) => setGuess(e.target.value)}
						sx={{ mb: 2 }}
						type="number"
						value={guess}
						variant="outlined"
					/>
					<TextField
						disabled={gameOver}
						fullWidth
						label="Enter your bet"
						onChange={(e) => setBet(e.target.value)}
						type="number"
						value={bet}
						variant="outlined"
					/>
				</Box>
				<Box sx={{ my: 2 }}>
					<Button disabled={gameOver} onClick={handleGuess} sx={{ mr: 1 }} variant="contained">
						Submit Guess
					</Button>
					<Button disabled={balance <= 0} onClick={handleNewGame} variant="outlined">
						New Game
					</Button>
					<Button onClick={handleResetGame} sx={{ ml: 1 }} variant="text">
						Dev Reset Game
					</Button>
				</Box>
				<Typography color="primary" gutterBottom variant="body1">
					{message}
				</Typography>
			</Paper>
			<Snackbar
				autoHideDuration={6000}
				onClose={() => setSnackbar({ ...snackbar, open: false })}
				open={snackbar.open}
			>
				<Alert
					onClose={() => setSnackbar({ ...snackbar, open: false })}
					severity={snackbar.severity as AlertColor}
					sx={{ width: '100%' }}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</Container>
	);
}

export default NumberGuessing;
