import { useDispatch } from 'react-redux';

import { ways } from 'constants/constRouter';

import history from 'utils/history';

import { FormikHelpers } from 'formik/dist/types';

import { deleteModalActionCreation } from 'redux/reducer/modalReducer';
import socketCreator, { SUBSCRIBE } from 'redux/thunk';
import { getMembers } from 'redux/reducer/selectors';

import { User } from 'redux/reducer/userReducer/types';
import { FieldIssues, FieldRegistry } from 'interfaces/commonForm';
import { useTypedSelector } from './useTypedSelector';

const { ADMIN, USER } = ways;

export const useSubmitFormRegistration = (): ((
	values: FieldRegistry,
	actions: FormikHelpers<FieldRegistry>
) => void) => {
	const dispatch = useDispatch();
	const { isAdmin } = useTypedSelector<User>(getMembers);
	const { roomNumber } = useTypedSelector<User>(getMembers);

	const toLobby = () => {
		const path = isAdmin ? ADMIN : USER;

		return history.push(path);
	};

	const submitForm = (values: FieldRegistry) => {
		dispatch(
			socketCreator({
				usersData: { ...values, isAdmin, roomNumber },
				type: SUBSCRIBE
			})
		);
		dispatch(deleteModalActionCreation());
		toLobby();
	};

	return submitForm;
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
