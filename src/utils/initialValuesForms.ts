import { FieldRegistry } from 'interfaces/commonForm';
import { Issue } from 'redux/reducer/gameSettingReducer/types';

export const initialValuesRegistration: FieldRegistry = {
	firstName: '',
	lastName: '',
	position: '',
	observer: false,
	avatar: ''
};

export const initialIssues: Issue = {
	id: 1,
	title: '',
	link: '',
	active: false,
	priority: 'Low'
};
