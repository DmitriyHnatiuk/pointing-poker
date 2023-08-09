import { ChangeEvent, forwardRef, memo } from 'react';

import { IInput } from 'src/interfaces/commonForm';
import ErrorMessage from '../ErrorMessage';

import styles from './index.module.scss';

interface CustomTypeInput extends Omit<IInput, 'label'> {
	ref?: React.LegacyRef<HTMLInputElement>;
	style?: string;
}

const CustomInput = ({
	data: {
		name,
		type = 'text',
		title = '',
		pattern = '',
		minLength,
		size,
		value,
		ref,
		isRequired,
		placeholder = ' ',
		onChange,
		onBlur,
		maxLength,
		style = '',
		defaultValue,
		readOnly,
		min,
		max
	}
}: {
	data: CustomTypeInput;
}) => {
	const attributes = {
		...(title ? { title } : {}),
		...(pattern ? { pattern } : {}),
		...(minLength ? { minLength } : {}),
		...(maxLength ? { maxLength } : {}),
		...(size ? { size } : {}),
		...(min ? { min } : {}),
		...(max ? { max } : {}),
		...(readOnly ? { readOnly } : {}),
		...(onBlur
			? {
					onBlur: (event: ChangeEvent<HTMLInputElement>) =>
						onBlur(event.target.value, event.target.name)
			  }
			: {})
	};
	return (
		<input
			className={`${styles.field} ${style}`}
			id={name}
			name={name}
			type={type}
			value={value}
			ref={ref}
			required={isRequired}
			placeholder={placeholder}
			{...(defaultValue ? { defaultValue } : {})}
			{...(onChange
				? {
						onChange: (event: ChangeEvent<HTMLInputElement>) =>
							onChange(event.target.value, event.target.name)
				  }
				: {})}
			{...attributes}
		/>
	);
};

const Input = forwardRef<HTMLInputElement, IInput>(
	(
		{
			label,
			style = '',
			name,
			isError = false,
			errorMessage,
			isLeftLabel = false,
			isDefaultLabel,
			...rest
		},
		ref
	) => (
		<div
			className={`${styles.container} 
      ${isLeftLabel ? styles.left_label : styles.up_label}
      ${isDefaultLabel ? styles.custom : ''} ${style}`}>
			<CustomInput data={{ ...rest, name, ref }} />
			{label && (
				<label className={styles.label} htmlFor={name}>
					{label}
				</label>
			)}
			{isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
		</div>
	)
);

// Input.displayName = 'Input';
export default memo(Input);
