import React from 'react';
import { ErrorMessage, Field, useField } from 'formik';
import { InterfaceFormikSelect } from 'interfaces/commonForm';
import TextError from 'components/common/Form/TextError';
import styles from './index.module.scss';

const SelectFormik: React.FC<InterfaceFormikSelect> = ({
	label,
	options,
	...props
}) => {
	const [field, meta] = useField(props);

	return (
		<div className={styles.formControl}>
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
						{key[0].toUpperCase() + key.slice(1)}
					</option>
				))}
			</Field>

			{meta.touched && meta.error ? (
				<ErrorMessage name={field.name} component={TextError} {...meta} />
			) : null}
		</div>
	);
};

export default SelectFormik;
