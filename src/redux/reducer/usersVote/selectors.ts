import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { selectResult } from '../ResultReducer/selectors';
import { selectCards } from '../planningReducer/selectors';
import { RatingType } from './type';

export const selectUsersVote = (state: RootState): Record<string, RatingType> =>
	state.usersVote;

export const selectActiveCardId = (state: RootState): string =>
	state.usersVote[state.user.data.id]?.cardId;

export type CardsDataType = { [key: string]: RatingType & { count: number } };

export const selectUsersVoteCards = createSelector(
	[selectUsersVote, selectCards],
	(voter, cards) =>
		Object.keys(voter).reduce(
			(
				acc: {
					data: CardsDataType;
					list: string[];
				},
				id: string
			) => ({
				data: {
					...acc.data,
					[voter[id].cardId]: {
						...cards[voter[id].cardId],
						count: acc.data[voter[id].cardId]?.count + 1 || 1
					}
				},
				list: [...new Set([...acc.list, voter[id].cardId])]
			}),
			{ data: {}, list: [] }
		)
);

export const selectResultCards = createSelector(
	[selectResult, selectCards],
	(issues, cards) =>
		Object.keys(issues).reduce(
			(
				acc: Record<string, { data: CardsDataType; list: string[] }>,
				issueId: string
			) => ({
				...acc,
				[issueId]: Object.keys(issues[issueId]).reduce(
					(
						acc: {
							data: CardsDataType;
							list: string[];
						},
						userId: string
					) => {
						const { cardId } = issues[issueId][userId];
						return {
							data: {
								...acc.data,
								[cardId]: {
									...cards[cardId],
									count: acc.data[cardId]?.count + 1 || 1
								}
							},
							list: [...new Set([...acc.list, cardId])]
						};
					},
					{ data: {}, list: [] }
				)
			}),
			{}
		)
);
