import { ChangeEvent, memo } from 'react';

import styles from './index.module.scss';

type PropsType = {
	name: string;
	id: string;
	label: string;
	style?: string;
	setAvatar: (file: File) => void;
};

const ImageInput = ({ label, style = '', name, id, setAvatar }: PropsType) => {
	const changeImage = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setAvatar(event.target.files[0]);
		}
	};

	return (
		<div className={`${styles.container} ${style}`}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			<input
				type="file"
				{...{ name }}
				id={id}
				accept="image/png, image/jpeg"
				onChange={changeImage}
			/>
		</div>
	);
};

export default memo(ImageInput);
