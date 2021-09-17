import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Form, Formik } from 'formik';

import { RootState } from 'redux/store';
import { ways } from 'constants/constRouter';
import { btn } from 'constants/commonComponents';
import MyButton from 'components/common/MyButton/MyButton';
import FormikControl from 'components/common/Form/FormikControl';
import { initialValuesRegistration } from 'utils/initialValuesForms';
import { TypeInputFormikControl } from 'interfaces/commonForm';
import { useSubmitFormRegistration } from 'hooks/submitForms';

import styles from './index.module.scss';

const { ADMIN, USER, HOME } = ways;
const { CONFIRM, CANCEL, OBSERVER } = btn;

const FormRegistration: React.FC<{ setForm: (arg: boolean) => void }> = ({
	setForm
}) => {
	const isAdmin = useSelector((state: RootState) => state.userReducer.isAdmin);
	const avatar = useSelector((state: RootState) => state.userReducer.avatar);
	const history = useHistory();

	const toAdmin = () => {
		const path = isAdmin ? ADMIN : USER;

		return history.push(path);
	};

	const toHome = () => setForm(false);

	return (
		<Formik
			initialValues={initialValuesRegistration}
			onSubmit={useSubmitFormRegistration}>
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
						<MyButton value={CONFIRM} onclick={toAdmin} type="submit" />
						<MyButton value={CANCEL} onclick={toHome} style={styles.cancel} />
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default FormRegistration;
