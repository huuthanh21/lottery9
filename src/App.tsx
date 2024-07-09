import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Pages from '@/routes/Pages';
import Header from '@/sections/Header';
import HotKeys from '@/sections/HotKeys';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';
import Sidebar from '@/sections/Sidebar';
import CssBaseline from '@mui/material/CssBaseline';
import {
	ThirdwebProvider,
	coinbaseWallet,
	metamaskWallet,
	walletConnect,
} from '@thirdweb-dev/react';
import { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';

function App() {
	return (
		<ThirdwebProvider
			clientId="your-client-id-here"
			supportedWallets={[
				metamaskWallet({
					recommended: true,
				}),
				coinbaseWallet(),
				walletConnect(),
			]}
		>
			<Fragment>
				<CssBaseline />
				<Notifications />
				<HotKeys />
				<SW />
				<BrowserRouter>
					<Header />
					<Sidebar />
					<Pages />
				</BrowserRouter>
			</Fragment>
		</ThirdwebProvider>
	);
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
