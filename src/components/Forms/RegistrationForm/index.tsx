import React from 'react';
import { useHistory } from 'react-router-dom';

import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';

import { setUserDataActionCreation } from 'redux/reducer/userReducer';
import { ways } from 'constants/constRouter';
import { btn } from 'constants/commonComponents';
import MyButton from 'components/common/MyButton/MyButton';
import FormikControl from 'components/common/Form/FormikControl';
import { initialValuesRegistration } from 'utils/initialValuesForms';
import { TypeInputFormikControl, FieldRegistry } from 'interfaces/commonForm';

import styles from './index.module.scss';

const { ADMIN, USER } = ways;
const { CONFIRM, CANCEL } = btn;

const FormRegistration: React.FC<{ setForm: (arg: boolean) => void }> = ({
	setForm
}) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const isAdmin = useSelector((state: RootState) => state.userReducer.isAdmin);
	const avatar = useSelector((state: RootState) => state.userReducer.avatar);

	const toLobby = () => {
		const path = isAdmin ? ADMIN : USER;

		return history.push(path);
	};

	const toHome = () => setForm(false);

	const useSubmitFormRegistration = (values: FieldRegistry): void => {
		const obj = { ...values };
		dispatch(setUserDataActionCreation(obj));
		toLobby();
	};

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
						<MyButton value={CONFIRM} type="submit" />
						<MyButton value={CANCEL} onclick={toHome} style={styles.cancel} />
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default FormRegistration;
