import React from 'react';

import s from 'assets/styles/common/Main.module.scss';
import MainPage from 'components/pages/MainPage/MainPage';

const Main: React.FC = (): JSX.Element => {
	return (
		<main className={s.main}>
			<MainPage />
		</main>
	);
};

export default Main;
