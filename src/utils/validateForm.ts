import * as Yup from 'yup';

export const validateSchemaIssues = Yup.object({
	title: Yup.string().required('Required'),
	link: Yup.string().required('Required'),
	priority: Yup.string().required('*year value is required.')
});

export const validateSchemaRegistration = Yup.object({
	firstName: Yup.string().required('Required'),
	lastName: Yup.string().required('Required'),
	jobPosition: Yup.string().required('Required')
});
