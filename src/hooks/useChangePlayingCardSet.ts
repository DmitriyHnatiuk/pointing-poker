import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setPlayingCardSetAction } from 'redux/reducer/gameSettingReducer';
import {
	Game,
	PlayingCard,
	PlayingCardSetEnum
} from 'redux/reducer/gameSettingReducer/types';
import { getGame } from 'redux/reducer/selectors';

import {
	linearSequenceCards,
	degreeTwoCards,
	fibonacciNumbersCards
} from 'constants/playingCardsSet';

import { useTypedSelector } from './useTypedSelector';

const { fibonacciNumbers, degreeTwo, linearSequence } = PlayingCardSetEnum;

export const useChangePlayingCardSet = (): void => {
	const dispatch = useDispatch();
	const { playingCardsSet } = useTypedSelector<Game>(getGame);

	useEffect(() => {
		switch (playingCardsSet) {
			case fibonacciNumbers: {
				dispatch(setPlayingCardSetAction(fibonacciNumbersCards));
				break;
			}

			case degreeTwo: {
				dispatch(setPlayingCardSetAction(degreeTwoCards));
				break;
			}

			case linearSequence: {
				dispatch(setPlayingCardSetAction(linearSequenceCards));
				break;
			}

			default:
				break;
		}
	}, [playingCardsSet]);
};

export const getNewPlayingCard = (): PlayingCard => {
	const fibArr = [
		1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584,
		4181, 6765, 10946
	];

	const { playingCardsSet, cards } = useTypedSelector<Game>(getGame);

	switch (playingCardsSet) {
		case linearSequence:
			return { id: 5, score: String(cards.length), count: 0 };

		case degreeTwo:
			return { id: 5, score: String(2 ** cards.length), count: 0 };

		case fibonacciNumbers:
			return { id: 5, score: String(fibArr[cards.length]), count: 0 };

		default:
			return { id: 5, score: 'other', count: 0 };
	}
};
