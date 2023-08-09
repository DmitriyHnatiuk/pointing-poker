import { RootState } from '../../store';
import { ResultType } from './types';

export const selectResult = (state: RootState): ResultType => state.result;
