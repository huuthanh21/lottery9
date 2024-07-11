import type { SnackbarKey } from 'notistack';

import { notifications as notificationsDefaults } from '@/config';
import { useCallback, useMemo } from 'react';
import { atom, useRecoilState } from 'recoil';

import { Actions, Notification } from './types';

const notificationsState = atom<Notification[]>({
	default: [],
	key: 'notificationsState',
});

function useNotifications(): [Notification[], Actions] {
	const [notifications, setNotifications] = useRecoilState(notificationsState);

	const push = useCallback(
		(notification: Partial<Notification>) => {
			// TODO (Suren): use uuid
			const id = Math.random().toString();
			setNotifications((notifications): Notification[] => [
				// TODO (Suren): use immer
				...notifications,
				{
					...notification,
					dismissed: false,
					message: notification.message,
					options: {
						...notificationsDefaults.options,
						...notification.options,
						key: id,
					},
				},
			]);

			return id;
		},
		[setNotifications],
	);

	const close = useCallback(
		(key: SnackbarKey, dismissAll = !key) => {
			setNotifications((notifications) =>
				notifications.map((notification) =>
					dismissAll || notification.options.key === key
						? { ...notification, dismissed: true }
						: { ...notification },
				),
			);
		},
		[setNotifications],
	);

	const remove = useCallback(
		(key: SnackbarKey) => {
			setNotifications((notifications) =>
				notifications.filter((notification) => notification.options.key !== key),
			);
		},
		[setNotifications],
	);

	// Update message or options of a notification
	const update = useCallback(
		(key: SnackbarKey, newNotification: Partial<Notification>) => {
			setNotifications((notifications) =>
				notifications.map((notification) =>
					notification.options.key === key
						? {
								...notification,
								message: newNotification.message ?? notification.message,
								options: {
									...notification.options,
									...newNotification.options,
								},
							}
						: { ...notification },
				),
			);
		},
		[setNotifications],
	);

	const actions = useMemo(() => ({ close, push, remove, update }), [push, close, remove, update]);

	return [notifications, actions];
}

export default useNotifications;
