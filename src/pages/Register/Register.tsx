import { Box, Button, Container, Link as MUILink, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface FormData {
	confirmPassword: string;
	password: string;
	username: string;
}

const RegisterPage: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		confirmPassword: '',
		password: '',
		username: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Here you would typically send the form data to your backend
		console.log('Form submitted:', formData);
	};

	return (
		<Container maxWidth="sm">
			<Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', mt: 8 }}>
				<Typography component="h1" variant="h5">
					Create an Account
				</Typography>
				<Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<TextField
						autoComplete="username"
						autoFocus
						fullWidth
						id="username"
						label="Username"
						margin="normal"
						name="username"
						onChange={handleChange}
						required
						value={formData.username}
					/>
					<TextField
						autoComplete="new-password"
						fullWidth
						id="password"
						label="Password"
						margin="normal"
						name="password"
						onChange={handleChange}
						required
						type="password"
						value={formData.password}
					/>
					<TextField
						fullWidth
						id="confirmPassword"
						label="Confirm Password"
						margin="normal"
						name="confirmPassword"
						onChange={handleChange}
						required
						type="password"
						value={formData.confirmPassword}
					/>
					<Button fullWidth sx={{ mb: 2, mt: 3 }} type="submit" variant="contained">
						Register
					</Button>
					<Box sx={{ mt: 2, textAlign: 'center' }}>
						<Link to="/login">
							<MUILink color="primary">{'Already have an account? Login'}</MUILink>
						</Link>
					</Box>
				</Box>
			</Box>
		</Container>
	);
};

export default RegisterPage;
