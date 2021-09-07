import React from 'react';
import styles from 'assets/styles/common/MyInput.module.scss';

const MyInput: React.FC = () => {
	const { myInput } = styles;

	return <input className={myInput} />;
};

export default MyInput;
