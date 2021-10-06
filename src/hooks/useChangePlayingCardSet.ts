import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setPlayingCardSetAction } from 'redux/reducer/gameSettingReducer';
import {
	Game,
	PlayingCardSetEnum
} from 'redux/reducer/gameSettingReducer/types';
import { getGame } from 'redux/reducer/selectors';
import {
	getDegreeTwoCards,
	getFibonacciCards,
	getLinearCards
} from 'utils/getPlayingCards';

import { useTypedSelector } from './useTypedSelector';

const { fibonacciNumbers, degreeTwo, linearSequence } = PlayingCardSetEnum;

export const useChangePlayingCardSet = (): void => {
	const dispatch = useDispatch();
	const { playingCardsSet, amountCard } = useTypedSelector<Game>(getGame);

	const linearCards = getLinearCards(amountCard);
	const degreeTwoCards = getDegreeTwoCards(amountCard);
	const fibonacciCards = getFibonacciCards(amountCard);

	useEffect(() => {
		switch (playingCardsSet) {
			case fibonacciNumbers: {
				dispatch(setPlayingCardSetAction(fibonacciCards));
				break;
			}

			case degreeTwo: {
				dispatch(setPlayingCardSetAction(degreeTwoCards));
				break;
			}

			case linearSequence: {
				dispatch(setPlayingCardSetAction(linearCards));
				break;
			}

			default:
				break;
		}
	}, [playingCardsSet]);
};
