import { currency } from '@/constants';
import useNotifications from '@/store/notifications';
import { ContentCopy } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { ConnectWallet, useAddress, useDisconnect } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import React, { MouseEvent, useEffect, useState } from 'react';

const WalletConnectButton: React.FC = () => {
	const address = useAddress();
	const disconnect = useDisconnect();
	const [balance, setBalance] = useState<string>('');
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [, actions] = useNotifications();

	useEffect(() => {
		const fetchBalance = async () => {
			if (address) {
				try {
					const provider = new ethers.providers.JsonRpcProvider(
						'https://rpc-amoy.polygon.technology/',
					); // Use the correct RPC URL for Polygon Amoy Testnet
					const balance = await provider.getBalance(address);
					setBalance(ethers.utils.formatEther(balance));
				} catch (error) {
					console.error('Error fetching balance:', error);
				}
			}
		};

		fetchBalance();
	}, [address]);

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleCopy = (text: string) => {
		navigator.clipboard.writeText(text);
		actions.push({ message: 'Copied to clipboard' });
	};

	return (
		<div>
			{address ? (
				<div>
					<Tooltip arrow title="Account">
						<IconButton onClick={handleClick}>
							<Avatar>
								<AccountCircleIcon />
							</Avatar>
						</IconButton>
					</Tooltip>
					<Menu anchorEl={anchorEl} keepMounted onClose={handleClose} open={Boolean(anchorEl)}>
						<MenuItem disableRipple>
							<Box alignItems="center" display="flex">
								<Typography sx={{ marginRight: 1 }} variant="body1">
									Address: {address}
								</Typography>
								<Tooltip title="Copy to clipboard">
									<IconButton onClick={() => handleCopy(address)} size="small">
										<ContentCopy fontSize="small" />
									</IconButton>
								</Tooltip>
							</Box>
						</MenuItem>
						<MenuItem disableRipple>
							<Box alignItems="center" display="flex">
								<Typography sx={{ marginRight: 1 }} variant="body1">
									Balance: {balance} {currency}
								</Typography>
								<Tooltip title="Copy to clipboard">
									<IconButton onClick={() => handleCopy(balance)} size="small">
										<ContentCopy fontSize="small" />
									</IconButton>
								</Tooltip>
							</Box>
						</MenuItem>
						<MenuItem
							disableRipple
							onClick={() => {
								disconnect();
								handleClose();
							}}
						>
							<Typography color={'primary'} variant="button">
								Disconnect
							</Typography>
						</MenuItem>
					</Menu>
				</div>
			) : (
				<ConnectWallet btnTitle="Connect Wallet" />
			)}
		</div>
	);
};

export default WalletConnectButton;
