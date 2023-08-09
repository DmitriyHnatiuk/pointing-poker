import { ChangeEvent, ReactNode } from 'react';

import { IOptions } from 'src/interfaces/commonForm';

export type SelectType = {
	name: string;
	label: string | ReactNode;
	options: IOptions[];
	style: string;
	isError?: boolean;
	errorMessage?: string;
	value?: string;
	onChange?: (value: ChangeEvent<HTMLSelectElement>) => void;
};
