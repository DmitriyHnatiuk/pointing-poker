import { ReactNode } from 'react';
type InputType =
	| 'text'
	| 'file'
	| 'number'
	| 'url'
	| 'tel'
	| 'email'
	| 'range'
	| 'color'
	| 'password';

export interface IInput {
	name: string;
	label?: string | ReactNode;
	placeholder?: string;
	maxLength?: number;
	minLength?: number;
	size?: number;
	value?: string;
	type?: InputType;
	title?: string;
	pattern?: string;
	style?: string;
	isChecked?: boolean;
	isRequired?: boolean;
	isError?: boolean;
	errorMessage?: string;
	defaultValue?: string;
	onChange?: (value: string, name: string) => void;
	onBlur?: (value: string, name: string) => void;
	readOnly?: boolean;
	isLeftLabel?: boolean;
	isDefaultLabel?: boolean;
	min?: string;
	max?: string;
}

export interface IOptions {
	key: string;
	value: string;
}

export type RegistryType = {
	firstName: string;
	lastName: string;
	position: string;
	isObserver: boolean;
};
