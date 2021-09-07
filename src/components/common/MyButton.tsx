import React from 'react';

import s from 'assets/styles/common/MyButton.module.scss';

const MyButton: React.FC = ({ children }): JSX.Element => {
	return (
		<button className={s.btn} type="button">
			{children}
		</button>
	);
};

export default MyButton;
