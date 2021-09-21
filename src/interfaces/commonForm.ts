import React, { ChangeEvent } from 'react';

export interface InterfaceFormikControl {
	control: string;
	name: string;
	label: string;
	style?: string;
	data?: TypeData;
	onChange?: (e: ChangeEvent) => void;
	children?: (errorMessage: string) => React.ReactNode;
}

type TypeData = InterfaceOptions[];

export interface InterfaceFormikInput {
	name: string;
	label: string;
	style?: string;
}

export interface InterfaceImagesFormik {
	name: string;
	label: string;
	style?: string;
}

export interface InterfaceFormikSelect {
	name: string;
	label: string;
	style?: string;
	options: InterfaceOptions[];
}

export interface InterfaceOptions {
	key: string;
	value: string;
}

export interface FieldRegistry {
	firstName: string;
	lastName: string;
	position: string;
	observer: boolean;
	avatar: string;
}

export interface FieldIssues {
	title: string;
	link: string;
	priority: string;
}

export enum TypeInputFormikControl {
	input = 'input',
	select = 'select',
	image = 'image',
	switch = 'switch'
}
