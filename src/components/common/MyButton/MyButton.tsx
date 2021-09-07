import React from 'react';

import styles from './MyButton.module.scss';

const MyButton: React.FC = ({ children }): JSX.Element => {
	return (
		<button className={styles.btn} type="button">
			{children}
		</button>
	);
};

export default MyButton;
