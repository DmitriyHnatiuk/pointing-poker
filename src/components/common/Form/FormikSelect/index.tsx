import React from 'react';
import { ErrorMessage, Field, useField } from 'formik';

import TextError from 'components/common/Form/TextError';
import { InterfaceFormikSelect } from 'interfaces/commonForm';

import styles from './index.module.scss';

const SelectFormik: React.FC<InterfaceFormikSelect> = ({
	label,
	options,
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
				className={styles.field}
				as="select"
				id={field.name}
				{...field}
				{...props}>
				{options.map(({ key, value }) => (
					<option key={value} value={value}>
						{key}
					</option>
				))}
			</Field>
			{isError && (
				<ErrorMessage name={field.name} component={TextError} {...meta} />
			)}
		</div>
	);
};

export default SelectFormik;
