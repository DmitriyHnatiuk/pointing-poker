import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setPlayingCardSet } from 'redux/reducer/gameSettingReducer';
import {
	Game,
	PlayingCardSetEnum
} from 'redux/reducer/gameSettingReducer/types';
import { getGame } from 'redux/reducer/selectors';

import {
	linearSequenceCards,
	degreeTwoCards,
	fibonacciNumbersCards
} from 'constants/playingCardsSet';

import { useTypedSelector } from './useTypedSelector';

export const useChangePlayingCardSet = (): void => {
	const dispatch = useDispatch();
	const { playingCardsSet } = useTypedSelector<Game>(getGame);
	const { fibonacciNumbers, degreeTwo, linearSequence } = PlayingCardSetEnum;

	useEffect(() => {
		switch (playingCardsSet) {
			case fibonacciNumbers: {
				dispatch(setPlayingCardSet(fibonacciNumbersCards));
				break;
			}

			case degreeTwo: {
				dispatch(setPlayingCardSet(degreeTwoCards));
				break;
			}

			case linearSequence: {
				dispatch(setPlayingCardSet(linearSequenceCards));
				break;
			}

			default:
				break;
		}
	}, [playingCardsSet]);
};
