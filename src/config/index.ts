import isMobile from '@/utils/is-mobile';

import type { Notifications } from './types';

const title = 'Lottery9';

const email = 'auther-email@gmail.com';

const repository = 'https://github.com/huuthanh21/lottery9';

const messages = {
	404: 'Hey bro? What are you looking for?',
	app: {
		crash: {
			options: {
				email: `contact with author by this email - ${email}`,
				reset: 'Press here to reset the application',
			},
			title: 'Oooops... Sorry, I guess, something went wrong. You can:',
		},
	},
	images: {
		failed: 'something went wrong during image loading :(',
	},
	loader: {
		fail: 'Hmmmmm, there is something wrong with this component loading process... Maybe trying later would be the best idea',
	},
};

const dateFormat = 'MMMM DD, YYYY';

const notifications: Notifications = {
	maxSnack: isMobile ? 3 : 4,
	options: {
		anchorOrigin: {
			horizontal: 'left',
			vertical: 'bottom',
		},
		autoHideDuration: 6000,
	},
};

const loader = {
	// no more blinking in your app
	delay: 300, // if your asynchronous process is finished during 300 milliseconds you will not see the loader at all
	minimumLoading: 700, // but if it appears, it will stay for at least 700 milliseconds
};

const defaultMetaTags = {
	description: 'Starter kit for modern web applications',
	image: '/cover.png',
};
const giphy404 = 'https://giphy.com/embed/xTiN0L7EW5trfOvEk0';

export {
	dateFormat,
	defaultMetaTags,
	email,
	giphy404,
	loader,
	messages,
	notifications,
	repository,
	title,
};
