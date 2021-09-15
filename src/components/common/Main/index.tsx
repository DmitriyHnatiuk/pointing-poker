import React from 'react';

import styles from './index.module.scss';

const Main: React.FC = ({ children }): JSX.Element => {
	return <main className={styles.main}>{children}</main>;
};

export default Main;
