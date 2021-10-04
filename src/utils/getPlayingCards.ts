import { useTypedSelector } from 'hooks/useTypedSelector';
import {
	Game,
	PlayingCard,
	PlayingCardSetEnum
} from 'redux/reducer/gameSettingReducer/types';
import { getGame } from 'redux/reducer/selectors';

const { fibonacciNumbers, degreeTwo, linearSequence } = PlayingCardSetEnum;

const unknownCard: PlayingCard = {
	id: 0,
	score: 'unknown',
	isFirstCard: true,
	count: 0
};

function fib(n: number): number {
	return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

export const getLinearCards = (amout: number): PlayingCard[] => {
	const resArr: PlayingCard[] = [unknownCard];

	for (let i = 1; i < amout; i += 1) {
		resArr.push({ id: i, score: String(i), count: 0 });
	}

	return resArr;
};

export const getDegreeTwoCards = (amout: number): PlayingCard[] => {
	const resArr: PlayingCard[] = [unknownCard];

	for (let i = 1; i < amout; i += 1) {
		resArr.push({ id: i, score: String(2 ** i), count: 0 });
	}

	return resArr;
};

export const getFibonacciCards = (amout: number): PlayingCard[] => {
	const resArr: PlayingCard[] = [unknownCard];

	for (let i = 1; i < amout; i += 1) {
		resArr.push({ id: i, score: String(fib(i + 1)), count: 0 });
	}

	return resArr;
};

export const getNewPlayingCard = (): PlayingCard => {
	const { playingCardsSet, amountCard } = useTypedSelector<Game>(getGame);

	switch (playingCardsSet) {
		case linearSequence:
			return { id: 5, score: String(amountCard), count: 0 };

		case degreeTwo:
			return { id: 5, score: String(2 ** amountCard), count: 0 };

		case fibonacciNumbers:
			return { id: 5, score: String(fib(amountCard + 1)), count: 0 };

		default:
			return { id: 5, score: 'other', count: 0 };
	}
};
