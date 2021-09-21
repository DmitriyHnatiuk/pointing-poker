import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ways } from 'constants/constRouter';

import { FormikHelpers } from 'formik/dist/types';
import { getMembers } from 'redux/reducer/selectors';
import { setUserDataActionCreation } from 'redux/reducer/userReducer';
import { User } from 'redux/reducer/userReducer/types';
import { FieldIssues, FieldRegistry } from 'interfaces/commonForm';
import { useTypedSelector } from './useTypedSelector';

const { ADMIN, USER } = ways;

export const useSubmitFormRegistration = (): ((
	values: FieldRegistry,
	actions: FormikHelpers<FieldRegistry>
) => void) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { isAdmin } = useTypedSelector<User>(getMembers);

	const toLobby = () => {
		const path = isAdmin ? ADMIN : USER;

		return history.push(path);
	};

	return (values: FieldRegistry) => {
		dispatch(setUserDataActionCreation(values));
		toLobby();
	};
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
