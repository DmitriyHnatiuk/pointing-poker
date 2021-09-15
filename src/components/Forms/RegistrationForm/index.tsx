import React from 'react';
import { Form, Formik } from 'formik';

import { TypeInputFormikControl } from 'interfaces/commonForm';
import FormikControl from 'components/common/Form/FormikControl';

import { initialValuesRegistration } from 'utils/initialValuesForms';
import { submitFormRegistration } from 'utils/submitForms';
import styles from './index.module.scss';

const FormRegistration: React.FC = () => {
	return (
		<Formik
			initialValues={initialValuesRegistration}
			onSubmit={submitFormRegistration}>
			{() => (
				<Form className={styles.form}>
					<h1 className={styles.title}>Connect to lobby</h1>
					<FormikControl
						control={TypeInputFormikControl.input}
						label="First name"
						name="firstName"
					/>
					<FormikControl
						control={TypeInputFormikControl.input}
						label="Last name"
						name="lastName"
					/>
					<FormikControl
						control={TypeInputFormikControl.input}
						label="Job name"
						name="jobPosition"
					/>
					<FormikControl
						control={TypeInputFormikControl.image}
						label="Avatar"
						name="image"
					/>
					<FormikControl
						control={TypeInputFormikControl.switch}
						label="Connect as Observer"
						name="observer"
					/>
					<img src="" alt="" />
					<button type="submit">Отправить</button>
				</Form>
			)}
		</Formik>
	);
};

export default FormRegistration;
