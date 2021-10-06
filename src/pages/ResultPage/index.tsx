import React from 'react';
import JS_PDF from 'jspdf';

import { getGame, getResult } from 'redux/reducer/selectors';

import { useTypedSelector } from 'hooks/useTypedSelector';

import MyButton from 'components/common/MyButton';

import cup from 'assets/images/PlayingCard/cup.svg';

import styles from './import.module.scss';

const ResultPage: React.FC = (): JSX.Element => {
	const { result } = useTypedSelector(getResult);
	const { scoreType } = useTypedSelector(getGame);

	const generatePD = () => {
		const doc = new JS_PDF('p', 'pt', 'a4');
		const toPDF = document.getElementById('toPDF');
		if (toPDF) {
			doc.html(toPDF, {
				callback(pdf) {
					pdf.save('statistic.pdf');
				}
			});
		}
	};

	return (
		<div className={styles.result_page}>
			<div className={styles.result_container}>
				<h1 className={styles.heading}>TITLE</h1>
				<div id="toPDF">
					{result.map((elem) => {
						const { id, title, priority, cards } = elem;

						const newCards = cards.filter((card) => card.count > 0);

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
									{newCards.map((card) => {
										return (
											<div className={styles.card_content}>
												<div className={styles.card}>
													<div className={styles.content}>
														<div className={styles.top}>
															<span className={styles.input}>{card.score}</span>
														</div>
														<div className={styles.type}>
															{card.isFirstCard ? (
																<img src={cup} alt="Cup" />
															) : (
																scoreType
															)}
														</div>
														<span className={styles.bottom}>{card.score}</span>
													</div>
												</div>
												<div className={styles.count}>{card.count} %</div>
											</div>
										);
									})}
								</div>
							</section>
						);
					})}
				</div>
			</div>
			<div className={styles.result_save}>
				<MyButton onclick={generatePD} type="primary" value="Save statistic" />
			</div>
		</div>
	);
};

export default ResultPage;
