import React, { ChangeEvent } from 'react';
import { Field, useField, useFormikContext } from 'formik';

import { InterfaceImagesFormik } from 'interfaces/commonForm';

import styles from './index.module.scss';

const ImagesFormik: React.FC<InterfaceImagesFormik> = ({
	label,
	style,
	...props
}) => {
	const [field] = useField(props);
	const { setFieldValue, values } = useFormikContext();
	const { name } = props;

	const changeImage = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files;
		if (file) {
			setFieldValue(`${name}`, file[0], false);
		}
	};

	field.value = undefined;

	return (
		<div className={`${styles.formControl} ${style}`}>
			<label htmlFor="name">{label}</label>
			<Field
				type="file"
				id={field.name}
				{...field}
				{...props}
				accept="image/png, image/jpeg"
				onChange={changeImage}
			/>
		</div>
	);
};

export default ImagesFormik;
