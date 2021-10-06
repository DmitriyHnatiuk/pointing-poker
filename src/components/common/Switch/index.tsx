import React from 'react';

import styles from './index.module.scss';

const Switch: React.FC<{
	id?: string;
	value?: boolean;
	setValue?: () => void;
}> = ({ id, value, setValue }): JSX.Element => {
	return (
		<label htmlFor={id} className={styles.switch}>
			<input id={id} type="checkbox" checked={value} onChange={setValue} />
			<span className={`${styles.slider} ${styles.round}`} />
		</label>
	);
};

export default Switch;
