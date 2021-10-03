import { useDispatch } from 'react-redux';

import { FormikHelpers } from 'formik/dist/types';

import { deleteModalActionCreation } from 'redux/reducer/modalReducer';
import socketCreator, { SUBSCRIBE } from 'redux/thunk';
import { getMembers } from 'redux/reducer/selectors';
import { addIssue } from 'redux/reducer/gameSettingReducer';
import { Issue } from 'redux/reducer/gameSettingReducer/types';

import { User } from 'redux/reducer/userReducer/types';
import { FieldRegistry } from 'interfaces/commonForm';
import { useTypedSelector } from './useTypedSelector';

export const useSubmitFormRegistration = (): ((
	values: FieldRegistry,
	actions: FormikHelpers<FieldRegistry>
) => void) => {
	const dispatch = useDispatch();
	const { isAdmin } = useTypedSelector<User>(getMembers);
	const { roomNumber } = useTypedSelector<User>(getMembers);

	const submitForm = (values: FieldRegistry) => {
		dispatch(
			socketCreator({
				usersData: { ...values, isAdmin, roomNumber },
				type: SUBSCRIBE
			})
		);
		dispatch(deleteModalActionCreation());
	};

	return submitForm;
};

export const useSubmitFormIssues = (): ((
	values: Issue,
	actions: FormikHelpers<Issue>
) => void) => {
	const dispatch = useDispatch();

	const submitForm = (values: Issue) => {
		dispatch(
			addIssue({
				...values,
				title: values.title.trimStart().slice(0, 12),
				priority: `${values.priority} priority`
			})
		);
		dispatch(deleteModalActionCreation());
	};

	return submitForm;
};
