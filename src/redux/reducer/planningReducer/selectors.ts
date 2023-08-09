import { createSelector } from '@reduxjs/toolkit';
import { generateCardsDec } from '../../../utils/getPlayingCards';
import { RootState } from '../../store';
import {
	IPlanning,
	IssueType,
	PlayingCardType,
	SettingsType,
	TimerSettingsType
} from './types';

export const selectPlanning = (state: RootState): IPlanning => state.planning;

export const selectPlanningSettings = (state: RootState): SettingsType =>
	state.planning.settings;

export const selectPlanningSettingsScore = (state: RootState): string =>
	state.planning.settings.scoreType;

export const selectRoundStatus = (state: RootState): boolean =>
	state.planning.isRunRound;

export const selectCards = (
	state: RootState
): Record<string, PlayingCardType> => state.planning.cards;

export const selectTypeOfCards = createSelector(
	(state: RootState): number => state.planning.settings.amountCard,
	(amountCard) => generateCardsDec(amountCard)
);

export const selectIssues = (state: RootState): Record<string, IssueType> =>
	state.planning.issues;

export const selectPlanningTimer = (state: RootState): TimerSettingsType =>
	state.planning.timer;

export const selectLoginStatus = (state: RootState): boolean =>
	state.planning.isLoginOpen;

export const selectActiveIssueId = (state: RootState): string =>
	state.planning.activeIssueId;
