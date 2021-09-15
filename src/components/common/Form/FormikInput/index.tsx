import React from 'react';
import { ErrorMessage, Field, useField } from 'formik';
import { InterfaceFormikInput } from 'interfaces/commonForm';

import TextError from 'components/common/Form/TextError';
import styles from './index.module.scss';

const InputFormik: React.FC<InterfaceFormikInput> = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<div className={styles.formControl}>
			<label className={styles.label} htmlFor="name">
				{label}
			</label>
			<Field className={styles.field} id={field.name} {...field} {...props} />
			{meta.touched && meta.error ? (
				<ErrorMessage name={field.name} component={TextError} {...meta} />
			) : null}
		</div>
	);
};

export default InputFormik;
