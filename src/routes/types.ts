import type { SvgIconProps } from '@mui/material/SvgIcon';

import { FC } from 'react';
import { PathRouteProps } from 'react-router-dom';

enum Pages {
	Welcome,
	NumberGuessing,
	Page1,
	Page2,
	Page3,
	Page4,
	NotFound,
}

type PathRouteCustomProps = {
	component: FC;
	icon?: FC<SvgIconProps>;
	title?: string;
};

type Routes = Record<Pages, PathRouteCustomProps & PathRouteProps>;

export { Pages };
export type { Routes };
