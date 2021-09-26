import React from 'react';
import { Form, Formik } from 'formik';

import { useSubmitFormRegistration } from 'hooks/submitForms';

import { initialValuesRegistration } from 'utils/initialValuesForms';
import { btnValue } from 'constants/commonComponents';

import MyButton from 'components/common/MyButton';
import FormikControl from 'components/common/Form/FormikControl';

import { InterfaceModals } from 'interfaces/modals';
import { TypeInputFormikControl } from 'interfaces/commonForm';

import Avatar from 'components/Avatar';

import styles from './index.module.scss';

const FormRegistration: React.FC<InterfaceModals> = ({ close }) => {
	const submit = useSubmitFormRegistration();

	return (
		<Formik initialValues={initialValuesRegistration} onSubmit={submit}>
			{({ values }) => (
				<Form className={styles.form}>
					<div className={styles.formHeader}>
						<h1 className={styles.title}>Connect to lobby</h1>
						<FormikControl
							control={TypeInputFormikControl.switch}
							label="Connect as Observer"
							name="observer"
							style={styles.observer}
						/>
					</div>
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
						name="position"
					/>
					<FormikControl
						control={TypeInputFormikControl.image}
						label="Avatar"
						name="avatar"
					/>
					<Avatar
						firstName={values.firstName}
						lastName={values.lastName}
						avatar={values.avatar}
					/>

					<div className={styles.buttons}>
						<MyButton value={btnValue.CONFIRM} type="submit" />
						<MyButton
							value={btnValue.CANCEL}
							onclick={close}
							style={styles.cancel}
						/>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default FormRegistration;
