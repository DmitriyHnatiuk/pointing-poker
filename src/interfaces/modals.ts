import { ReactNode } from 'react';

export type ModalsType = {
	isOpen: boolean;
	onClose?: () => void;
	children: ReactNode;
	style?: Record<string, string>;
	className?: string;
};
