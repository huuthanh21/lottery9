import { Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import React from 'react';

const features = [
	{
		description: 'Simple and intuitive games that everyone can enjoy.',
		image:
			'https://images.unsplash.com/photo-1493185659424-16c86605dd4f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		title: 'Easy to Play',
	},
	{
		description: 'Our games are fair and your data is secure with us.',
		image:
			'https://plus.unsplash.com/premium_photo-1682125939509-03aa8ae4b587?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		title: 'Fair and Secure',
	},
	{
		description: 'Win big rewards and cash prizes.',
		image:
			'https://images.unsplash.com/photo-1640161704729-cbe966a08476?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		title: 'Big Rewards',
	},
];

const Features = () => {
	const handleHover = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
		const target = event.currentTarget;
		target.style.transform = 'scale(1.1)';
		target.style.transition = 'transform 0.3s';
	};

	const handleHoverOut = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
		const target = event.currentTarget;
		target.style.transform = 'scale(1)';
	};

	return (
		<Container style={{ padding: '4rem 0' }}>
			<Typography align="center" gutterBottom variant="h4">
				Why Choose Us?
			</Typography>
			<Grid container spacing={4}>
				{features.map((feature, index) => (
					<Grid item key={index} md={4} sm={6} xs={12}>
						<Card style={{ cursor: 'pointer', overflow: 'hidden' }}>
							<CardMedia
								component="img"
								height="140"
								image={feature.image}
								onMouseOut={handleHoverOut}
								onMouseOver={handleHover}
								title={feature.title}
							/>
							<CardContent>
								<Typography component="h2" gutterBottom variant="h5">
									{feature.title}
								</Typography>
								<Typography color="textSecondary" component="p" variant="body2">
									{feature.description}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default Features;
