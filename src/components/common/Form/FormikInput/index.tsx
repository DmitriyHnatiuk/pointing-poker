import React from 'react';
import { ErrorMessage, Field, useField } from 'formik';

import TextError from 'components/common/Form/TextError';

import { InterfaceFormikInput } from 'interfaces/commonForm';

import styles from './index.module.scss';

const InputFormik: React.FC<InterfaceFormikInput> = ({ label, ...props }) => {
	const [field, meta] = useField(props);

	return (
		<div className={styles.formControl}>
			<label className={styles.label} htmlFor="name">
				{label}
			</label>
			<Field className={styles.field} id={field.name} {...field} {...props} />
			{meta.touched && meta.error && (
				<ErrorMessage name={field.name} component={TextError} {...meta} />
			)}
		</div>
	);
};

export default InputFormik;
