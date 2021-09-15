import React, { ChangeEvent } from 'react';
import { Field, useField, useFormikContext } from 'formik';

import { InterfaceImagesFormik } from 'interfaces/commonForm';

import styles from './index.module.scss';

const ImagesFormik: React.FC<InterfaceImagesFormik> = ({ label, ...props }) => {
	const [field] = useField(props);
	const { setFieldValue } = useFormikContext();
	const { name } = props;
	field.value = undefined;
	return (
		<div className={styles.formControl}>
			<label htmlFor="name">{label}</label>
			<Field
				type="file"
				id={field.name}
				{...field}
				{...props}
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					const file = e.target.files;
					if (file) {
						setFieldValue(`${name}`, file[0], false);
					}
				}}
			/>
		</div>
	);
};

export default ImagesFormik;
