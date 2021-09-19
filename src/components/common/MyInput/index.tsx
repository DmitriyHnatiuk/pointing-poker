import React from 'react';

import styles from './index.module.scss';

const MyInput: React.FC<{
	onchange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	style?: string;
}> = ({ value, onchange, style = '' }) => {
	return (
		<input
			className={`${styles.myInput} ${style}`}
			value={value}
			onChange={onchange}
		/>
	);
};
export default MyInput;
