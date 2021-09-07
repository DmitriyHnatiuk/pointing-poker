import React from 'react';

import MainPage from 'components/pages/MainPage/MainPage';

import styles from './Main.module.scss';

const Main: React.FC = (): JSX.Element => {
	return (
		<main className={styles.main}>
			<MainPage />
		</main>
	);
};

export default Main;
