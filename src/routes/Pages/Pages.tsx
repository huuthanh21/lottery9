import Footer from '@/sections/Footer';
import Box from '@mui/material/Box';
import { Route, Routes } from 'react-router-dom';

import routes from '..';
import { getPageHeight } from './utils';

function Pages() {
	return (
		<Box sx={{ height: (theme) => getPageHeight(theme) }}>
			<Routes>
				{Object.values(routes).map(({ component: Component, path }) => {
					return <Route element={<Component />} key={path} path={path} />;
				})}
			</Routes>
			<Footer />
		</Box>
	);
}

export default Pages;
