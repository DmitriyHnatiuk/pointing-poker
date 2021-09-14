import React from 'react';

import styles from './MyButton.module.scss';

const MyButton: React.FC<{
	onclick?: () => void;
	value: string;
}> = ({onclick, value }): JSX.Element => {
	return (
			<input
					className={styles.btn}
					onClick={onclick}
					type="button"
					value={value}
			/>
		);
};

export default MyButton;
