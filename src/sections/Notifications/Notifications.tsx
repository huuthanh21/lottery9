import { notifications } from '@/config';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { CustomContentProps, SnackbarProvider } from 'notistack';
import { Ref, forwardRef } from 'react';

import Notifier from './Notifier';

// here how you can define your own notification component

const CustomNotification = forwardRef(function CustomNotification(
	{ message }: CustomContentProps,
	ref: Ref<HTMLDivElement>,
) {
	return (
		<Alert ref={ref} severity="info">
			<AlertTitle>Notification demo (random IT jokes :))</AlertTitle>
			{message}
		</Alert>
	);
});

function Notifications() {
	return (
		<SnackbarProvider
			Components={{
				customNotification: CustomNotification,
			}}
			maxSnack={notifications.maxSnack}
		>
			<Notifier />
		</SnackbarProvider>
	);
}

export default Notifications;
