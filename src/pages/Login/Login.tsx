import { Box, Button, Container, Link as MUILink, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface LoginData {
	email: string;
	password: string;
}

const LoginPage: React.FC = () => {
	const [loginData, setLoginData] = useState<LoginData>({
		email: '',
		password: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setLoginData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Here you would typically send the login data to your backend
		console.log('Login submitted:', loginData);
	};

	return (
		<Container maxWidth="sm">
			<Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', mt: 8 }}>
				<Typography component="h1" variant="h5">
					Log In
				</Typography>
				<Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<TextField
						autoComplete="email"
						autoFocus
						fullWidth
						id="email"
						label="Email Address"
						margin="normal"
						name="email"
						onChange={handleChange}
						required
						value={loginData.email}
					/>
					<TextField
						autoComplete="current-password"
						fullWidth
						id="password"
						label="Password"
						margin="normal"
						name="password"
						onChange={handleChange}
						required
						type="password"
						value={loginData.password}
					/>
					<Button fullWidth sx={{ mb: 2, mt: 3 }} type="submit" variant="contained">
						Log In
					</Button>
					<Box sx={{ mt: 2, textAlign: 'center' }}>
						<Link to="/register">
							<MUILink color="primary">{"Don't have an account? Sign Up"}</MUILink>
						</Link>
					</Box>
				</Box>
			</Box>
		</Container>
	);
};

export default LoginPage;
