import React from 'react';

import styles from './index.module.scss';

const MyButton: React.FC<{
	onclick?: () => void;
	value: string;
	style?: string;
	type?: string;
}> = ({ onclick, value, style = '', type = 'button' }): JSX.Element => {
	return (
		<input
			className={`${styles.btn} ${style}`}
			onClick={onclick}
			type={type}
			value={value}
		/>
	);
};

export default MyButton;
