import React from 'react';
import { ErrorMessage, Field, useField } from 'formik';

import TextError from 'components/common/Form/TextError';

import { InterfaceFormikInput } from 'interfaces/commonForm';

import styles from './index.module.scss';

const FormikSwitch: React.FC<InterfaceFormikInput> = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	const value = field.checked;

	return (
		<div className={styles.formControl}>
			<label className={styles.label} htmlFor="name">
				{label}
			</label>
			<Field
				type="checkbox"
				className={styles.field}
				id={field.name}
				{...field}
				{...props}
				checked={value}
			/>
			{meta.touched && meta.error && (
				<ErrorMessage name={field.name} component={TextError} {...meta} />
			)}
		</div>
	);
};

export default FormikSwitch;
