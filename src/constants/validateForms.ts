import * as yup from 'yup';

export const validateSchemaRegistration = yup.object().shape({
	firstName: yup
		.string()
		.required('Required field')
		.min(2, 'Minimum number of characters 2')
		.max(15, 'Maximum number of characters 15')
});

export const validateSchemaIssues = yup.object().shape({
	title: yup
		.string()
		.required('Required field')
		.min(2, 'Minimum number of characters 2')
		.max(15, 'Maximum number of characters 15'),

	link: yup.string().required('Required field')
});
