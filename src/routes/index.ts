/* eslint-disable perfectionist/sort-objects */
import asyncComponentLoader from '@/utils/loader';
import AddTaskIcon from '@mui/icons-material/AddTask';
import BugReportIcon from '@mui/icons-material/BugReport';
import CasinoIcon from '@mui/icons-material/Casino';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import TerrainIcon from '@mui/icons-material/Terrain';

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
	[Pages.Page1]: {
		component: asyncComponentLoader(() => import('@/pages/Page1')),
		path: '/page-1',
		title: 'Page 1',
		icon: GitHubIcon,
	},
	[Pages.Page2]: {
		component: asyncComponentLoader(() => import('@/pages/Page2')),
		path: '/page-2',
		title: 'Page 2',
		icon: AddTaskIcon,
	},
	[Pages.Page3]: {
		component: asyncComponentLoader(() => import('@/pages/Page3')),
		path: '/page-3',
		title: 'Page 3',
		icon: TerrainIcon,
	},
	[Pages.Page4]: {
		component: asyncComponentLoader(() => import('@/pages/Page4')),
		path: '/page-4',
		title: 'Page 4',
		icon: BugReportIcon,
	},
	[Pages.NotFound]: {
		component: asyncComponentLoader(() => import('@/pages/NotFound')),
		path: '*',
	},
};

export default routes;
