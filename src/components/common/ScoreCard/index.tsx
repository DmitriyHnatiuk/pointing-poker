import styles from './index.module.scss';

const ScoreCard = ({ selectedCard }: { selectedCard?: string }) => (
	<div className={styles.card}>
		<p className="text">{selectedCard || 'In progress'}</p>
	</div>
);

export default ScoreCard;
