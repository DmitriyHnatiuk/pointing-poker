import React from 'react';

import { PlayingCard } from 'redux/reducer/gameSettingReducer/types';

// import PlayingCardComponent from 'components/common/PlayingCard';
// import { useTypedSelector } from 'hooks/useTypedSelector';
// import { getGame } from 'redux/reducer/selectors';
import cup from 'assets/images/PlayingCard/cup.svg';

import styles from './import.module.scss';

// card: PlayingCard;
// scoreType: string;

// export interface PlayingCard {
// 	id: number;
// 	score: string;
// 	isFirstCard?: boolean;
// 	active?: boolean;
// 	count: number;
// }

// const aa: PlayingCard = { id: 1, score: '2', count: 0 };

const resultData = [
	{
		id: 'f0ou9g7ckuehoc2j',
		title: 'Issue_1',
		priority: 'low priority',
		link: '',
		active: true,
		cards: [
			{ card: { id: 1, score: '2', count: 0 }, scoreType: 'ST' },
			{ card: { id: 1, score: '2', count: 0 }, scoreType: 'ST' }
		]
	}
];

const ResultPage: React.FC = () => {
	return (
		<div className={styles.result_page}>
			<h1 className={styles.heading}>TITLE</h1>
			{resultData.map((elem) => {
				const { id, title, priority, active, cards } = elem;

				return (
					<section className={styles.result} key={id}>
						<div className={styles.issue_card}>
							<div className={styles.isuue_content}>
								<div className={styles.isuue}>
									<span className={styles.issue_title}>{title}</span>
									<span className={styles.priority}>{priority}</span>
								</div>
							</div>
						</div>
						<div className={styles.cards}>
							{cards.map((card) => {
								return (
									<div className={styles.card_content}>
										<div className={styles.card}>
											<div className={styles.content}>
												<div className={styles.top}>
													<span className={styles.input}>
														{card.card.score}
													</span>
												</div>
												<div className={styles.type}>
													{active ? (
														<img src={cup} alt="Cup" />
													) : (
														card.scoreType
													)}
												</div>
												<span className={styles.bottom}>{card.card.score}</span>
											</div>
										</div>
										<div className={styles.count}>{card.card.count} %</div>
									</div>
								);
							})}
						</div>
					</section>
				);
			})}
		</div>
	);
};

export default ResultPage;
