import React from 'react';
import { useDispatch } from 'react-redux';

import { SetSelectCardBack } from 'redux/reducer/gameSettingReducer';

import { imagesCardBack } from 'constants/commonComponents';

import styles from './index.module.scss';

interface InterfaceCardBack {
	card: string;
	number: number;
}

const CardBackList: React.FC = () => {
	const dispatch = useDispatch();

	const CardBack: React.FC<InterfaceCardBack> = ({ card, number }) => {
		const onSelectCardBack = () => {
			dispatch(SetSelectCardBack(number));
		};

		return (
			<>
				<li className={styles.cardBack}>
					<img
						aria-hidden="true"
						className={styles.image}
						src={card}
						alt=""
						onClick={onSelectCardBack}
					/>
				</li>
			</>
		);
	};

	return (
		<>
			<ul className={styles.cardBackList}>
				{imagesCardBack.map((card, key) => {
					return <CardBack card={card} number={key} key={card} />;
				})}
			</ul>
		</>
	);
};

export default CardBackList;
