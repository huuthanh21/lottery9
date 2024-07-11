/* eslint-disable perfectionist/sort-objects */
import asyncComponentLoader from '@/utils/loader';
import CasinoIcon from '@mui/icons-material/Casino';
import HomeIcon from '@mui/icons-material/Home';
import LooksOneIcon from '@mui/icons-material/LooksOne';

import { Pages, Routes } from './types';

const routes: Routes = {
	[Pages.Welcome]: {
		component: asyncComponentLoader(() => import('@/pages/Welcome')),
		path: '/',
		title: 'Welcome',
		icon: HomeIcon,
	},
	[Pages.NumberGuessing]: {
		component: asyncComponentLoader(() => import('@/pages/NumberGuessing')),
		path: '/number-guessing',
		title: 'Number Guessing',
		icon: LooksOneIcon,
	},
	[Pages.SicBo]: {
		component: asyncComponentLoader(() => import('@/pages/SicBo')),
		path: '/sic-bo',
		title: 'Sic Bo',
		icon: CasinoIcon,
	},
	[Pages.Lottery]: {
		component: asyncComponentLoader(() => import('@/pages/Lottery')),
		path: '/lottery',
		title: 'Lottery',
		icon: CasinoIcon,
	},
	[Pages.NotFound]: {
		component: asyncComponentLoader(() => import('@/pages/NotFound')),
		path: '*',
	},
};

export default routes;
