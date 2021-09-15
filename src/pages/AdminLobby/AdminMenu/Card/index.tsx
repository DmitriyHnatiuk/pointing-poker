import React from 'react';

import styles from './index.module.scss';

const Card: React.FC = (): JSX.Element => {
	const cardName = '1'; // Example

	return (
		<li className={styles.card}>
			<h3>{cardName}</h3>
			<img src="#" alt=".jpg" />
			<span className={styles.pen}>✎</span>
			<h3>{cardName}</h3>
		</li>
	);
};

export default Card;
