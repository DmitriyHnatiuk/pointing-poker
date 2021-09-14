import React from 'react';

import styles from './index.module.scss';

const Switch: React.FC = (): JSX.Element => {
	return (
		<>
			<label htmlFor="link" className={styles.switch}>
				<input type="checkbox" />
				<span className={`${styles.slider} ${styles.round}`} />
			</label>
		</>
	);
};

export default Switch;
