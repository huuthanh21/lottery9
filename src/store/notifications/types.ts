import type { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';

interface Notification {
	dismissed: boolean;
	message: SnackbarMessage;
	options: OptionsObject;
}

declare module 'notistack' {
	export interface VariantOverrides {
		// define custom variants
		customNotification: {
			message?: string;
		};
	}
}

type Actions = {
	close: (key: SnackbarKey, dismissAll?: boolean) => void;
	push: (notification: Partial<Notification>) => SnackbarKey;
	remove: (key: SnackbarKey) => void;
	update: (key: SnackbarKey, newNotification: Partial<Notification>) => void;
};

export type { Actions, Notification };
