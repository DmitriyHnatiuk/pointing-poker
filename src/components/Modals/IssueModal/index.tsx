import { FormEvent } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

import Button from '../../common/Button';
import Input from '../../common/Form/Input';
import Select from '../../common/Form/Select';

import { addIssue } from '_redux/reducer/planningReducer';
import { IssueType } from '_redux/reducer/planningReducer/types';
import socketCreator from '_redux/thunk';

import {
	BUTTON_VALUES,
	OPTIONS_PRIORITY
} from 'src/constants/commonComponents';

import { EVENTS, URLS } from 'src/constants/constRouter';
import { useAppDispatch } from 'src/hooks/useTypedSelector';
import { getLink } from 'src/utils';
import { generateId, getFormData } from 'src/utils/initialValuesForms';

import styles from './index.module.scss';

type PropsType = {
	onClose: () => void;
};

const IssueModal = ({ onClose }: PropsType) => {
	const dispatch = useAppDispatch();
	const location = useLocation();

	const submit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data: IssueType = getFormData(event);

		const issue = {
			...data,
			id: generateId(),
			title: data.title.trimStart().slice(0, 24),
			link: getLink(data.link)
		};

		if (matchPath(URLS.PLANNING, location.pathname)) {
			dispatch(socketCreator({ type: EVENTS.ADD_ISSUE, issue }));
		} else {
			dispatch(addIssue(issue));
		}

		onClose();
	};

	return (
		<form className={styles.form} onSubmit={submit}>
			<h3 className="title-3 text-align-center">Create Issue</h3>
			<Input
				isRequired
				minLength={2}
				maxLength={25}
				style={styles.field}
				label="Title:"
				name="title"
				isLeftLabel
			/>
			<Input
				isRequired
				minLength={2}
				style={styles.field}
				label="Link:"
				name="link"
				isLeftLabel
			/>
			<Select
				style={styles.field}
				label="Priority:"
				name="priority"
				options={OPTIONS_PRIORITY}
			/>
			<div className={styles.buttons}>
				<Button
					style={styles.button}
					children={BUTTON_VALUES.YES}
					type="submit"
				/>
				<Button
					children={BUTTON_VALUES.NO}
					onClick={onClose}
					style={`${styles.button} ${styles.cancel}`}
				/>
			</div>
		</form>
	);
};

export default IssueModal;
