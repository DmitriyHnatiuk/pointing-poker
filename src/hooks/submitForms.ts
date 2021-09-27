import { useDispatch } from 'react-redux';

import { FormikHelpers } from 'formik/dist/types';

import { deleteModalActionCreation } from 'redux/reducer/modalReducer';
import socketCreator, { SUBSCRIBE } from 'redux/thunk';
import { getMembers } from 'redux/reducer/selectors';

import { User } from 'redux/reducer/userReducer/types';
import { FieldIssues, FieldRegistry } from 'interfaces/commonForm';
import { useTypedSelector } from './useTypedSelector';

export const useSubmitFormRegistration = (): ((
	values: FieldRegistry,
	actions: FormikHelpers<FieldRegistry>
) => void) => {
	const dispatch = useDispatch();
	const { isAdmin } = useTypedSelector<User>(getMembers);
	const { roomNumber } = useTypedSelector<User>(getMembers);

const submitForm = (values: FieldRegistry) => {
  dispatch(socketCreator({
				usersData: { ...values, isAdmin, roomNumber },
				type: SUBSCRIBE
			})
		);
		dispatch(deleteModalActionCreation());
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
