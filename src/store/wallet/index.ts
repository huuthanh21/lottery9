import { atom, useSetRecoilState } from 'recoil';

import { AtomEffectParams } from '../types';
import { Wallet } from './type';

const WalletState = atom<Wallet>({
	default: {
		address: '',
		balance: 0,
	},
	effects_UNSTABLE: [synchronizeWithLocalStorage],
	key: 'wallet',
});

function synchronizeWithLocalStorage({ onSet, setSelf }: AtomEffectParams) {
	const storedWallet = localStorage.getItem('wallet');
	storedWallet && setSelf(JSON.parse(storedWallet));
	onSet((value: Wallet) => localStorage.setItem('wallet', JSON.stringify(value)));
}

export const useWalletActions = () => {
	const setWalletState = useSetRecoilState(WalletState);

	const logOut = () => {
		setWalletState({ address: '', balance: 0 });
		localStorage.removeItem('wallet');
	};

	return { logOut };
};

export default WalletState;
