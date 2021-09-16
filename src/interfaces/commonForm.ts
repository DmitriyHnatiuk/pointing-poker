import React, { ChangeEvent } from 'react';

export interface InterfaceFormikControl {
	control: string;
	name: string;
	label: string;
	data?: TypeData;
	onChange?: (e: ChangeEvent) => void;
	children?: (errorMessage: string) => React.ReactNode;
}

type TypeData = InterfaceOptions[];

export interface InterfaceFormikInput {
	name: string;
	label: string;
}

export interface InterfaceImagesFormik {
	name: string;
	label: string;
}

export interface InterfaceFormikSelect {
	name: string;
	label: string;
	options: InterfaceOptions[];
}

export interface InterfaceOptions {
	key: string;
	value: string;
}

export interface FieldRegistry {
	firstName: string;
	lastName: string;
	jobPosition: string;
	observer: boolean;
	image: string | File;
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
