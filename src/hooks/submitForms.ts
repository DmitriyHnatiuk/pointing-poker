import { FormikHelpers } from 'formik/dist/types';

import { useDispatch } from 'react-redux';
import { setUserDataActionCreation } from 'redux/reducer/userReducer';

import { FieldIssues, FieldRegistry } from '../interfaces/commonForm';

export const useSubmitFormRegistration = (
	values: FieldRegistry,
	actions: FormikHelpers<FieldRegistry>
): void => {
	const obj = { ...values };
	const dispatchForm = () => {
		const dispatch = useDispatch();
		dispatch(setUserDataActionCreation(obj));
	};
	dispatchForm();
	setTimeout(() => {
		console.log(values);
		actions.setSubmitting(false);
	}, 1000);
};

export const useSubmitFormIssues = (
	values: FieldIssues,
	actions: FormikHelpers<FieldIssues>
): void => {
	setTimeout(() => {
		console.log(values);
		actions.setSubmitting(false);
	}, 1000);
};
