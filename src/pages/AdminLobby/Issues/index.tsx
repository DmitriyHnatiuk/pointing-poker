import React from 'react';

import styles from './index.module.scss';

const Issues: React.FC = (): JSX.Element => {
	const issues = 'hi';

	return (
		<div id="issues" className={styles.issues}>
			<h3 className={styles.title}>Issues:</h3>
			<ul className={styles.issueList}>
				<li className={styles.box}>
					<h2 className={styles.nameIssues}>{issues}</h2>
					<p>
						<span className={styles.wastebasket}>🗑</span>
						<span className={styles.pen}>✎</span>
					</p>
					<p className={styles.description}>Low profile</p>
				</li>
				<li className={styles.newOne}>
					<h4 className={styles.nameOneNewIssue}>Crete new Issue</h4>
					<span className={styles.plus}>+</span>
				</li>
			</ul>
		</div>
	);
};

export default Issues;
