import React from 'react';
import { ErrorMessage, Field, useField } from 'formik';

import TextError from 'components/common/Form/TextError';
import { InterfaceFormikInput } from 'interfaces/commonForm';

import styles from './index.module.scss';

const FormikSwitch: React.FC<InterfaceFormikInput> = ({
	label,
	style,
	...props
}) => {
	const [field, meta] = useField(props);

	const isError = meta.touched && meta.error;

	return (
		<div className={`${styles.formControl} ${style}`}>
			<label className={styles.label} htmlFor="name">
				{label}
			</label>
			<Field
				type="checkbox"
				className={styles.field}
				id={field.name}
				{...field}
				{...props}
				checked={field.value}
			/>
			{isError && (
				<ErrorMessage name={field.name} component={TextError} {...meta} />
			)}
		</div>
	);
};

export default FormikSwitch;
