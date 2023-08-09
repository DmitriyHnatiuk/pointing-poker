import { FormEvent } from 'react';
import { v4 as uuid } from 'uuid';

export const generateId = () => uuid();

export const getFormData = (event: FormEvent<HTMLFormElement>) =>
	Object.fromEntries(
		new FormData(event.currentTarget).entries() as Iterable<
			[{ [key: string]: string }, FormDataEntryValue]
		>
	);

export const getInitialsName = (data: {
	firstName: string;
	lastName?: string;
}) =>
	data.firstName
		? `${data.firstName[0] || ''} ${
				data.lastName ? data.lastName[0] : data.firstName[1] || ''
		  }`
		: '';
