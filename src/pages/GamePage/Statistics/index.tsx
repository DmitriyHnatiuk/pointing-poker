import React from 'react';

import RenderCards from '../RenderCards';

import styles from './index.module.scss';

const Statistics: React.FC = (): JSX.Element => {
	return (
		<div className={styles.statistics}>
			<h3>Statistics:</h3>
			<RenderCards inStatistics />
		</div>
	);
};

export default Statistics;
