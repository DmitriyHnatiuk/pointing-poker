import { RootState } from '../../store';

export const selectLoading = (state: RootState): boolean =>
	state.loading.isLoading;
