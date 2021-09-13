import React from 'react';
import { useSelector } from 'react-redux';

import styles from './index.module.scss';

const GameStatus: React.FC = (): JSX.Element => {
	const planningTitle: any = useSelector<{ planningTitle: string }>(
		(state) => state.planningTitle
	);
	return (
		<>
			<h1 className={styles.planningTitle}>{planningTitle}</h1>
			<div className={styles.status}>
				<span className={styles.titleStatus}>Scram master:</span>
				{/* plateAdmin */}
			</div>
			<div className={styles.gameStatus}>
				<label htmlFor="link" className={styles.titleLink}>
					<p>Link to lobby:</p>
					<input className={styles.inputLink} type="text" name="link" />
					<input className={styles.buttonCopy} type="submit" value="Copy" />
				</label>
				<div className={styles.buttonGame}>
					<button className={styles.Start} type="button">
						Start Game
					</button>
					<button className={styles.Cancel} type="button">
						Cancel game
					</button>
				</div>
			</div>
		</>
	);
};

export default GameStatus;
