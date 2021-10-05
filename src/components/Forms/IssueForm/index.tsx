import React from 'react';
import { Form, Formik } from 'formik';

import FormikControl from 'components/common/Form/FormikControl';
import MyButton from 'components/common/MyButton';

import { useSubmitFormIssues } from 'hooks/submitForms';

import {
	InterfaceOptions,
	TypeInputFormikControl
} from 'interfaces/commonForm';
import { InterfaceModals } from 'interfaces/modals';

import { initialIssues } from 'utils/initialValuesForms';
import { btnValue } from 'constants/commonComponents';

import styles from './index.module.scss';

const optionsPriority: InterfaceOptions[] = [
	{ key: 'Low', value: 'low' },
	{ key: 'Middle', value: 'middle' },
	{ key: 'Height', value: 'height' }
];

const IssueForm: React.FC<InterfaceModals> = ({ close }) => {
	const submit = useSubmitFormIssues();

	return (
		<Formik initialValues={initialIssues} onSubmit={submit}>
			{() => (
				<Form className={styles.form}>
					<h1 className={styles.title}>Create Issue</h1>
					<FormikControl
						style={styles.field}
						control={TypeInputFormikControl.input}
						label="Title:"
						name="title"
					/>
					<FormikControl
						style={styles.field}
						control={TypeInputFormikControl.input}
						label="Link:"
						name="link"
					/>
					<FormikControl
						style={styles.field}
						control={TypeInputFormikControl.select}
						label="Priority:"
						name="priority"
						data={optionsPriority}
					/>
					<div className={styles.buttons}>
						<MyButton
							style={styles.button}
							value={btnValue.YES}
							type="submit"
						/>
						<MyButton
							value={btnValue.NO}
							onclick={close}
							style={`${styles.button} ${styles.cancel}`}
						/>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default IssueForm;
