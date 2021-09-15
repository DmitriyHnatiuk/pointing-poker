import { FieldIssues, FieldRegistry } from '../interfaces/commonForm';

export const initialValuesRegistration: FieldRegistry = {
	firstName: '',
	lastName: '',
	jobPosition: '',
	observer: false,
	image: ''
};

export const initialIssues: FieldIssues = {
	title: '',
	link: '',
	priority: ''
};
