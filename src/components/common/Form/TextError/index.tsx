import React, { ComponentType } from 'react';

import styles from './index.module.scss';

const TextError: string | ComponentType | undefined = (props) => {
	const { children } = props;

	return <div className={styles.formError}>{children}</div>;
};

export default TextError;
