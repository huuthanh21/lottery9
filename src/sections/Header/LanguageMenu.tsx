import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import enImg from '../assets/en.png';
import viImg from '../assets/vi.png';

const LanguageMenu: React.FC = () => {
	const [t, i18n] = useTranslation('global');
	const languages = [
		{
			code: 'en',
			name: t('english'),
		},
		{
			code: 'vi',
			name: t('vietnamese'),
		},
	];
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); // Default language

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLanguageSelect = (language: string) => {
		setSelectedLanguage(language);
		i18n.changeLanguage(language);
		localStorage.setItem('language', language);
		handleClose();
		// Implement language change logic here
	};

	return (
		<div>
			<Tooltip arrow title="Switch language">
				<IconButton
					onClick={handleClick}
					size="large"
					sx={{
						':hover': {
							backgroundColor: 'grey.500',
						},
						backgroundColor: 'grey.300',
						borderRadius: '50%',
						height: '30px', // Set button size
						marginTop: '14px',
						marginX: '10px',
						overflow: 'hidden', //  Hide overflow if the image exceeds the button size
						padding: 0, // Remove padding to fit the image properly
						width: '30px', // Set button size
					}}
				>
					<img
						src={selectedLanguage === 'en' ? enImg : viImg}
						style={{
							borderRadius: '50%',
							height: '60%',
							objectFit: 'cover',
							width: '60%',
						}}
					></img>
				</IconButton>
			</Tooltip>
			<Menu anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
				{languages.map((lang) => (
					<MenuItem key={lang.code} onClick={() => handleLanguageSelect(lang.code)}>
						{lang.name}
					</MenuItem>
				))}
				{/* Add more MenuItem components for other languages */}
			</Menu>
		</div>
	);
};

export default LanguageMenu;
