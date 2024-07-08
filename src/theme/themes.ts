import { ThemeOptions } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

import { Themes } from './types';

const sharedTheme = {
	components: {
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
		},
		MuiDivider: {
			styleOverrides: {
				// in Divider API - https://mui.com/material-ui/api/divider/#css
				middle: {
					marginBottom: 10,
					marginTop: 10,
					width: '80%',
				},
				// TODO: open issue for missing "horizontal" CSS rule
				vertical: {
					marginLeft: 10,
					marginRight: 10,
				},
			},
		},
	},
	palette: {
		background: {
			default: '#fafafa',
			paper: '#fff',
		},
	},
} as ThemeOptions; // the reason for this casting is deepmerge return type
// TODO (Suren): replace mui-utils-deepmerge with lodash or ramda deepmerge

const themes: Record<Themes, ThemeOptions> = {
	dark: deepmerge(sharedTheme, {
		palette: {
			background: {
				default: '#111',
				paper: '#171717',
			},
			mode: 'dark',
			primary: {
				main: '#d1b0f0',
			},
		},
	}),

	light: deepmerge(sharedTheme, {
		palette: {
			background: {
				default: '#fafafa',
				paper: '#fff',
			},
			mode: 'light',
			primary: {
				main: '#3f51b5',
			},
		},
	}),
};

export default themes;
