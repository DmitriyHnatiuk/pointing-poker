import React from 'react';
import { Form, Formik } from 'formik';

import { useTypedSelector } from 'hooks/useTypedSelector';
import { getMembers } from 'redux/reducer/selectors';
import { useSubmitFormRegistration } from 'hooks/submitForms';
import { TypeInputFormikControl } from 'interfaces/commonForm';

import { User } from 'redux/reducer/userReducer/types';
import { initialValuesRegistration } from 'utils/initialValuesForms';
import { btn } from 'constants/commonComponents';

import MyButton from 'components/common/MyButton';
import FormikControl from 'components/common/Form/FormikControl';

import styles from './index.module.scss';

const { CONFIRM, CANCEL } = btn;

const FormRegistration: React.FC<{ setForm: (arg: boolean) => void }> = ({
	setForm
}) => {
	const { avatar } = useTypedSelector<User>(getMembers);
	const toHome = () => setForm(false);
	const submit = useSubmitFormRegistration();

	return (
		<Formik initialValues={initialValuesRegistration} onSubmit={submit}>
			{() => (
				<Form className={styles.form}>
					<div className={styles.formContent}>
						<div className={styles.formFields}>
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
								name="position"
							/>
							<FormikControl
								control={TypeInputFormikControl.image}
								label="Avatar"
								name="avatar"
							/>
							<img src={avatar} alt="avatar" />
						</div>
						<FormikControl
							control={TypeInputFormikControl.switch}
							label="Connect as Observer"
							name="observer"
						/>
					</div>
					<div className={styles.buttons}>
						<MyButton value={CONFIRM} type="submit" />
						<MyButton value={CANCEL} onclick={toHome} style={styles.cancel} />
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default FormRegistration;
