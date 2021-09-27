import React from 'react';

import styles from './index.module.scss';

const ScoreCard: React.FC<{ selectedCard: string | undefined }> = ({
	selectedCard
}) => {
	const score = selectedCard || 'In progress';

	return (
		<div className={styles.card}>
			<div className={styles.score}>
				<p>{score}</p>
			</div>
		</div>
	);
};

export default ScoreCard;
