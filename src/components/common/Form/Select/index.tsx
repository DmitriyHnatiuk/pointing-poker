import { ChangeEvent, forwardRef, memo } from 'react';
import ErrorMessage from '../ErrorMessage';
import styles from './index.module.scss';
import { SelectType } from './type';

const Select = forwardRef<HTMLSelectElement, SelectType>(
	(
		{ name, label, options, style, isError, errorMessage, value, onChange },
		ref
	) => (
		<div className={`${styles.container} ${style}`}>
			<label className={styles.label} htmlFor={name}>
				{label}
			</label>
			<select
				ref={ref}
				className={styles.field}
				id={name}
				name={name}
				value={value}
				{...(onChange
					? {
							onChange: (event: ChangeEvent<HTMLSelectElement>) =>
								onChange(event)
					  }
					: {})}>
				{options.map(({ key, value }) => (
					<option key={value} value={value}>
						{key}
					</option>
				))}
			</select>
			{isError && <ErrorMessage children={errorMessage} />}
		</div>
	)
);

export default memo(Select);
