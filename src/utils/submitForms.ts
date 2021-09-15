import { FormikHelpers } from 'formik/dist/types';
import { FieldIssues, FieldRegistry } from '../interfaces/commonForm';

export const submitFormRegistration = (
	values: FieldRegistry,
	actions: FormikHelpers<FieldRegistry>
): void => {
	setTimeout(() => {
		console.log(values);
		actions.setSubmitting(false);
	}, 1000);
};

export const submitFormIssues = (
	values: FieldIssues,
	actions: FormikHelpers<FieldIssues>
): void => {
	setTimeout(() => {
		console.log(values);
		actions.setSubmitting(false);
	}, 1000);
};
