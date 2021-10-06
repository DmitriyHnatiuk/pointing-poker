import React from 'react';
import { useDispatch } from 'react-redux';

import { getGame } from 'redux/reducer/selectors';
import { SetSelectCardBack } from 'redux/reducer/gameSettingReducer';
import { useTypedSelector } from 'hooks/useTypedSelector';

import { imagesCardBack } from 'constants/commonComponents';

import iconActiveCard from 'assets/images/PlayingCard/active_card.svg';

import styles from './index.module.scss';

interface InterfaceCardBack {
	card: string;
	number: number;
}

const CardBackList: React.FC = () => {
	const dispatch = useDispatch();
	const { typeCards } = useTypedSelector(getGame);

	const CardBack: React.FC<InterfaceCardBack> = ({ card, number }) => {
		const onSelectCardBack = () => {
			dispatch(SetSelectCardBack(number));
		};

		return (
			<>
				<img
					aria-hidden="true"
					className={styles.image}
					src={card}
					alt=""
					onClick={onSelectCardBack}
				/>
			</>
		);
	};

	const RenderCards: React.FC = () => {
		return (
			<>
				{imagesCardBack.map((card, key) => {
					const numCard = key;
					return (
						<div className={styles.cardBlock}>
							{numCard === typeCards && (
								<div className={styles.activeCard}>
									<img
										width="40"
										height="40"
										src={iconActiveCard}
										alt="Active card"
									/>
								</div>
							)}
							<CardBack card={card} number={key} key={card} />
						</div>
					);
				})}
			</>
		);
	};

	return (
		<>
			<ul className={styles.cardBackList}>
				<RenderCards />
			</ul>
		</>
	);
};

export default CardBackList;
