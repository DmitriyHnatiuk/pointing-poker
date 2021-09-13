import React from 'react';

// import MainPage from 'pages/MainPage';
import TeamMembers from 'pages/TeamMembers';

import styles from './Main.module.scss';

const Main: React.FC = (): JSX.Element => {
	return (
		<main className={styles.main}>
			{/* <MainPage /> */}
			<TeamMembers />
		</main>
	);
};

export default Main;
