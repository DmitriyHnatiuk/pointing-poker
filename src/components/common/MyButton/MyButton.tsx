import React from 'react';

import styles from './MyButton.module.scss';

const MyButton: React.FC<{
	onclick?: () => void;
	value: string;
	style?: string;
}> = ({ onclick, value, style = '' }): JSX.Element => {
	return (
		<input
			className={`${styles.btn} ${style}`}
			onClick={onclick}
			type="button"
			value={value}
		/>
	);
};

export default MyButton;
