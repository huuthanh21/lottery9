import {
	Alert,
	Box,
	Button,
	Chip,
	Container,
	Paper,
	Snackbar,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';

type BetType = 'Big' | 'Small' | null;

interface SnackbarState {
	message: string;
	open: boolean;
	severity: 'error' | 'info' | 'success' | 'warning';
}

function SicBo() {
	const [balance, setBalance] = useState<number>(1000);
	const [bet, setBet] = useState<string>('');
	const [betType, setBetType] = useState<BetType>(null);
	const [dice, setDice] = useState<number[]>([]);
	const [message, setMessage] = useState<string>('');
	const [snackbar, setSnackbar] = useState<SnackbarState>({
		message: '',
		open: false,
		severity: 'info',
	});

	const rollDice = (): number[] => {
		return Array(3)
			.fill(0)
			.map(() => Math.floor(Math.random() * 6) + 1);
	};

	const handleBetTypeChange = (event: React.MouseEvent<HTMLElement>, newBetType: BetType) => {
		setBetType(newBetType);
	};

	const handleRoll = () => {
		const betAmount = parseInt(bet);
		if (!betType || bet === '' || isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
			setSnackbar({ message: 'Please place a valid bet first', open: true, severity: 'warning' });
			return;
		}

		const rolledDice = rollDice();
		setDice(rolledDice);

		const sum = rolledDice.reduce((a, b) => a + b, 0);
		const win =
			(betType === 'Big' && sum >= 11 && sum <= 17) ||
			(betType === 'Small' && sum >= 4 && sum <= 10);

		if (win) {
			setBalance(balance + betAmount);
			setMessage(`You won! +$${betAmount}`);
		} else {
			setBalance(balance - betAmount);
			setMessage(`You lost. -$${betAmount}`);
		}

		setBetType(null);
		setBet('');
	};

	return (
		<Container maxWidth="sm">
			<Paper elevation={3} sx={{ mt: 4, p: 4 }}>
				<Typography gutterBottom variant="h4">
					Sic Bo
				</Typography>
				<Typography gutterBottom variant="h6">
					Balance: ${balance}
				</Typography>
				<Box sx={{ my: 2 }}>
					<TextField
						fullWidth
						label="Enter your bet"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBet(e.target.value)}
						sx={{ mb: 2 }}
						type="number"
						value={bet}
						variant="outlined"
					/>
					<ToggleButtonGroup
						aria-label="bet type"
						exclusive
						fullWidth
						onChange={handleBetTypeChange}
						value={betType}
					>
						<ToggleButton aria-label="small bet" value="Small">
							Small (4-10)
						</ToggleButton>
						<ToggleButton aria-label="big bet" value="Big">
							Big (11-17)
						</ToggleButton>
					</ToggleButtonGroup>
				</Box>
				<Button fullWidth onClick={handleRoll} sx={{ mt: 2 }} variant="contained">
					Roll Dice
				</Button>
				<Box sx={{ my: 2 }}>
					{dice.map((die, index) => (
						<Chip key={index} label={die} sx={{ fontSize: '1.5rem', mr: 1 }} />
					))}
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
					severity={snackbar.severity}
					sx={{ width: '100%' }}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</Container>
	);
}

export default SicBo;
