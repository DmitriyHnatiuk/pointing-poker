import { ReactNode, SyntheticEvent, memo, useState } from 'react';
import styles from './index.module.scss';

type PropsType = {
	name: string;
	value?: boolean;
	onChange?: (event: SyntheticEvent<HTMLInputElement>) => void;
	style?: string;
	label?: string | ReactNode;
};

const Switch = ({
	name,
	value,
	onChange,
	style = '',
	label = ''
}: PropsType) => {
	const [_value, setValue] = useState(value);

	const handleChange = (event: SyntheticEvent<HTMLInputElement>) =>
		typeof onChange === 'function'
			? onChange(event)
			: setValue((prev) => !prev);

	return (
		<div className={`${styles.switcher_container} ${style}`}>
			{label && <span>{label}</span>}
			<div>
				<label htmlFor={name} className={styles.switch}>
					<input
						id={name}
						name={name}
						type="checkbox"
						checked={value ?? _value}
						onChange={handleChange}
					/>
					<span className={`${styles.slider} ${styles.round}`} />
				</label>
			</div>
		</div>
	);
};

export default memo(Switch);
