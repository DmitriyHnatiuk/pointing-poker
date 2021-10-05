import React from 'react';
import { ErrorMessage, Field, useField } from 'formik';

import TextError from 'components/common/Form/TextError';
import { InterfaceFormikInput } from 'interfaces/commonForm';

import styles from './index.module.scss';

const InputFormik: React.FC<InterfaceFormikInput> = ({
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
			<div className={styles.fieldBlock}>
				<Field className={styles.field} id={field.name} {...field} {...props} />
				{isError && (
					<ErrorMessage name={field.name} component={TextError} {...meta} />
				)}
			</div>
		</div>
	);
};

export default InputFormik;
