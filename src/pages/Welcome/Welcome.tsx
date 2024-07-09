import Meta from '@/components/Meta';
import { Box } from '@mui/system';

import Features from './Features';
import Hero from './Hero';

function Welcome() {
	return (
		<>
			<Meta title="Welcome" />
			<Box component="main">
				<Hero />
				<Features />
			</Box>
		</>
	);
}

export default Welcome;
