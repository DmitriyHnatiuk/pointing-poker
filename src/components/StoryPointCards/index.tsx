import React from 'react';

import StoryPointCard from 'components/common/StoryPointCard';

import { useTypedSelector } from 'hooks/useTypedSelector';
import { getSPCards } from 'redux/reducer/selectors';
import { ISPCardsState } from 'redux/reducer/storyPointCardsReducer/types';

import styles from './index.module.scss';

const StoryPointCards: React.FC = () => {
	const { SPCards } = useTypedSelector<ISPCardsState>(getSPCards);

	return (
		<div className={styles.cards}>
			{SPCards.map((card) => {
				return <StoryPointCard card={card} key={card.id} />;
			})}
		</div>
	);
};

export default StoryPointCards;
