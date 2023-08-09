import { memo, useCallback } from 'react';

import { useAppDispatch } from 'src/hooks/useTypedSelector';

import { setSelectCardBack } from '_redux/reducer/planningReducer';

import Button from '../../common/Button';

import { CARDS_BACK } from '_assets/images/CardBack';
import IconActiveCardImage from '_assets/images/PlayingCard/active_card.svg?url';

import styles from './index.module.scss';

type CardBackType = {
	card: string;
	number: number;
};

const CardBack = memo(({ card, number }: CardBackType) => {
	const dispatch = useAppDispatch();

	const onSelectCardBack = useCallback(() => {
		dispatch(setSelectCardBack(number));
	}, []);

	return (
		<Button style={styles.button} onClick={onSelectCardBack} variant="icon">
			<img
				src={require(`_assets/images/CardBack/${card}`)}
				alt={`card_${number}`}
				loading="lazy"
			/>
		</Button>
	);
});

const ActiveCard = () => (
	<div className={styles.active_card}>
		<img width="40" height="40" src={IconActiveCardImage} alt="Active card" />
	</div>
);

type PropsType = { typeCards: number };
const CardBackList = ({ typeCards }: PropsType) => (
	<>
		<h3 className="title-3 text-align-center">Select cover:</h3>
		<ul className={styles.card_back_list}>
			{CARDS_BACK.map(({ name }, key) => (
				<li className={styles.card_block} key={key}>
					{key === typeCards && <ActiveCard />}
					<CardBack card={name} number={key} />
				</li>
			))}
		</ul>
	</>
);

export default memo(CardBackList);
