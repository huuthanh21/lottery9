import { FlexBox } from '@/components/styled';
import { repository, title } from '@/config';
import useHotKeysDialog from '@/store/hotkeys';
import useNotifications from '@/store/notifications';
import useSidebar from '@/store/sidebar';
import useTheme from '@/store/theme';
import GitHubIcon from '@mui/icons-material/GitHub';
import ThemeIcon from '@mui/icons-material/InvertColors';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';

import { HotKeysButton } from './styled';
import { getRandomJoke } from './utils';

function Header() {
	const [, sidebarActions] = useSidebar();
	const [theme, themeActions] = useTheme();
	const [, notificationsActions] = useNotifications();
	const [, hotKeysDialogActions] = useHotKeysDialog();

	function showNotification() {
		notificationsActions.push({
			message: getRandomJoke(),
			options: {
				// Show fully customized notification
				// Usually, to show a notification, you'll use something like this:
				// notificationsActions.push({ message: ... })
				// `message` accepts string as well as ReactNode
				// If you want to show a fully customized notification, you can define
				// your own `variant`s, see @/sections/Notifications/Notifications.tsx
				variant: 'customNotification',
			},
		});
	}

	return (
		<Box data-pw={`theme-${theme}`} sx={{ flexGrow: 1 }}>
			<AppBar color="transparent" elevation={1} position="static">
				<Toolbar sx={{ justifyContent: 'space-between' }}>
					<FlexBox sx={{ alignItems: 'center' }}>
						<IconButton
							aria-label="menu"
							color="info"
							edge="start"
							onClick={sidebarActions.toggle}
							size="large"
							sx={{ mr: 1 }}
						>
							<MenuIcon />
						</IconButton>
						<Button color="info" onClick={showNotification}>
							{title}
						</Button>
					</FlexBox>
					<FlexBox>
						<FlexBox>
							<Tooltip arrow title="Hot keys">
								<HotKeysButton
									aria-label="open hotkeys dialog"
									onClick={hotKeysDialogActions.open}
									size="small"
									variant="outlined"
								>
									alt + k
								</HotKeysButton>
							</Tooltip>
						</FlexBox>
						<Divider flexItem orientation="vertical" />
						<Tooltip arrow title="Github Repo">
							<IconButton color="info" component="a" href={repository} size="large" target="_blank">
								<GitHubIcon />
							</IconButton>
						</Tooltip>
						<Divider flexItem orientation="vertical" />
						<Tooltip arrow title="Switch theme">
							<IconButton
								color="info"
								data-pw="theme-toggle"
								edge="end"
								onClick={themeActions.toggle}
								size="large"
							>
								<ThemeIcon />
							</IconButton>
						</Tooltip>
					</FlexBox>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default Header;
