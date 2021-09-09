import React from 'react';

import styles from './index.module.scss';

const Members: React.FC = (): JSX.Element => {
	return (
		<div className={styles.membersWrapper}>
			<h2>Members</h2>
			<div id="members" className={styles.membersContent}>
				<ul className={styles.membersList}>
					<li className={styles.member}>Some Members....</li>
				</ul>
			</div>
		</div>
	);
};

export default Members;
