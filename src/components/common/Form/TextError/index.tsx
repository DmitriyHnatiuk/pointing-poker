import React from 'react';
import styles from './index.module.scss';

const TextError = ({ ...props }): JSX.Element => {
	return <div className={styles.formError}>{props.value.children}</div>;
};

export default TextError;
