/* eslint-disable perfectionist/sort-objects */
import asyncComponentLoader from '@/utils/loader';
import CasinoIcon from '@mui/icons-material/Casino';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LooksOneIcon from '@mui/icons-material/LooksOne';

import { Pages, Routes } from './types';

const routes: Routes = {
	[Pages.Login]: {
		component: asyncComponentLoader(() => import('@/pages/Login')),
		path: '/login',
		title: 'Login',
		icon: LoginIcon,
	},
	[Pages.Register]: {
		component: asyncComponentLoader(() => import('@/pages/Register')),
		path: '/register',
		title: 'Register',
	},
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
	[Pages.NotFound]: {
		component: asyncComponentLoader(() => import('@/pages/NotFound')),
		path: '*',
	},
};

export default routes;
