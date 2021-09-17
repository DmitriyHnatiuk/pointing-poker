import { FieldIssues, FieldRegistry } from '../interfaces/commonForm';

export const initialValuesRegistration: FieldRegistry = {
	firstName: '',
	lastName: '',
	position: '',
	observer: false,
	avatar: ''
};

export const initialIssues: FieldIssues = {
	title: '',
	link: '',
	priority: ''
};
