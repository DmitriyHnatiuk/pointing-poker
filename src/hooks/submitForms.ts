import { useDispatch } from 'react-redux';

import history from 'utils/history';

import { FormikHelpers } from 'formik/dist/types';

import { ways } from 'constants/constRouter';
import { deleteModalActionCreation } from 'redux/reducer/modalReducer';
import socketCreator, { ADD_ISSUE, SUBSCRIBE } from 'redux/thunk';
import { getMembers } from 'redux/reducer/selectors';
import { addIssue } from 'redux/reducer/gameSettingReducer';
import { Issue } from 'redux/reducer/gameSettingReducer/types';

import { User } from 'redux/reducer/userReducer/types';
import { FieldRegistry } from 'interfaces/commonForm';
import { useTypedSelector } from './useTypedSelector';

const { GAME } = ways;

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
		const issue = {
			...values,
			title: values.title.trimStart().slice(0, 12),
			priority: `${values.priority} priority`
		};
		if (history.location.pathname === GAME) {
			dispatch(socketCreator({ type: ADD_ISSUE, issue }));
		} else {
			dispatch(addIssue(issue));
		}
		dispatch(deleteModalActionCreation());
	};

	return submitForm;
};
