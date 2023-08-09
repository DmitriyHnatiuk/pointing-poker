import { ReactNode } from 'react';

import styles from './index.module.scss';

const ErrorMessage = ({ children }: { children: ReactNode }) => (
	<div className={styles.form_error}>{children}</div>
);

export default ErrorMessage;
