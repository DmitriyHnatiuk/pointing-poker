import React from 'react';
import { Form, Formik } from 'formik';

import FormikControl from 'components/common/Form/FormikControl';

import {
	InterfaceOptions,
	TypeInputFormikControl
} from 'interfaces/commonForm';
import { initialIssues } from 'utils/initialValuesForms';
import { useSubmitFormIssues } from 'hooks/submitForms';

import styles from './index.module.scss';

const optionsPriority: InterfaceOptions[] = [
	{ key: 'Low', value: 'low' },
	{ key: 'Middle', value: 'middle' },
	{ key: 'Height', value: 'height' }
];

const IssueForm: React.FC = () => {
	return (
		<Formik initialValues={initialIssues} onSubmit={useSubmitFormIssues}>
			{() => (
				<Form className={styles.form}>
					<h1 className={styles.title}>Create Issue</h1>
					<FormikControl
						control={TypeInputFormikControl.input}
						label="Title"
						name="title"
					/>
					<FormikControl
						control={TypeInputFormikControl.input}
						label="Link"
						name="link"
					/>
					<FormikControl
						control={TypeInputFormikControl.select}
						label="Priority"
						name="priority"
						data={optionsPriority}
					/>
					<button type="submit">Отправить</button>
				</Form>
			)}
		</Formik>
	);
};

export default IssueForm;
