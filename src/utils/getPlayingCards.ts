import {
	PlayingCardSetEnum,
	PlayingCardType
} from '../redux/reducer/planningReducer/types';
import { generateId } from './initialValuesForms';

export const getInterest = ({
	count,
	length
}: {
	count: number;
	length: number;
}) => Math.floor(Math.min((count / length) * 100, 100));

const { fibonacciNumbers, degreeTwo, linearSequence } = PlayingCardSetEnum;

const unknownCard: PlayingCardType = {
	cardId: generateId(),
	score: 'unknown',
	isFirstCard: true
};

function fib(n: number): number {
	return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

export const getLinearCards = (
	amount: number
): Record<string, PlayingCardType> => {
	const dec: Record<string, PlayingCardType> = {
		[unknownCard.cardId]: unknownCard
	};
	Array.from({ length: amount }, (_, index) => {
		const cardId = generateId();
		dec[cardId] = {
			cardId,
			score: String(index + 1)
		};
	});
	return dec;
};

const getDegreeTwoCards = (amount: number): Record<string, PlayingCardType> => {
	const dec = {
		[unknownCard.cardId]: unknownCard
	};

	Array.from({ length: amount }, (_, index) => {
		const cardId = generateId();
		dec[cardId] = {
			cardId,
			score: String(2 ** index)
		};
	});
	return dec;
};

const getFibonacciCards = (amount: number): Record<string, PlayingCardType> => {
	const dec: Record<string, PlayingCardType> = {
		[unknownCard.cardId]: unknownCard
	};

	Array.from({ length: amount }, (_, index) => {
		const cardId = generateId();
		dec[cardId] = {
			cardId,
			score: String(fib(index + 1))
		};
	});

	return dec;
};

export const getNewPlayingCard = ({
	playingCardsSet,
	amountCard
}: {
	playingCardsSet: keyof { [key in PlayingCardSetEnum]: any };
	amountCard: number;
}): PlayingCardType => {
	const deck = {
		[linearSequence]: {
			cardId: generateId(),
			score: String(amountCard + 1)
		},
		[degreeTwo]: { cardId: generateId(), score: String(2 ** amountCard) },
		[fibonacciNumbers]: {
			cardId: generateId(),
			score: String(fib(amountCard + 1))
		}
	};
	return deck[playingCardsSet] || { cardId: generateId(), score: 'other' };
};

export const generateCardsDec = (amountCard: number) => ({
	[PlayingCardSetEnum.fibonacciNumbers]: () => getFibonacciCards(amountCard),
	[PlayingCardSetEnum.degreeTwo]: () => getDegreeTwoCards(amountCard),
	[PlayingCardSetEnum.linearSequence]: () => getLinearCards(amountCard)
});
