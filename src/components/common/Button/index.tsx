import { MouseEvent, ReactNode } from 'react';

import styles from './index.module.scss';

type ButtonType = {
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	children: ReactNode;
	style?: string;
	variant?: 'contained' | 'outlined' | 'text' | 'icon';
	type?: 'button' | 'submit' | 'reset';
	dataId?: string;
};

const Button = ({
	onClick,
	children,
	style = '',
	type = 'button',
	variant = 'contained',
	dataId
}: ButtonType) => {
	return (
		<button
			className={`${styles.btn} ${style} ${styles[variant]}`}
			onClick={onClick}
			type={type}
			{...(dataId ? { 'data-id': dataId } : {})}>
			{children}
		</button>
	);
};

export default Button;
